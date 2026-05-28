terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.28"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
  }
}

provider "aws" {
  region = var.region
}

module "analytics" {
  source = "heyitsmeharv/quiet-ly/aws"

  version = "0.1.8"

  table_name            = var.table_name
  allowed_origin        = var.allowed_origin
  log_retention_days    = var.log_retention_days
  enable_cloudfront     = var.enable_cloudfront
  enable_query_endpoint = var.enable_query_endpoint
  tags                  = var.tags
}

output "analytics_endpoint" {
  description = "Analytics endpoint URL - pass this to the SDK config."
  value       = module.analytics.endpoint_url
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name."
  value       = module.analytics.cloudfront_domain_name
}

output "table_name" {
  description = "DynamoDB table name."
  value       = module.analytics.table_name
}

# ── Likes ─────────────────────────────────────────────────────────────────────

data "archive_file" "likes_lambda" {
  type        = "zip"
  source_file = "${path.module}/likes-lambda/dist/index.js"
  output_path = "${path.module}/likes-lambda/handler.zip"
}

resource "aws_dynamodb_table" "likes" {
  name         = "my-portfolio-likes"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "PK"
  range_key    = "SK"

  attribute {
    name = "PK"
    type = "S"
  }

  attribute {
    name = "SK"
    type = "S"
  }

  tags = var.tags
}

resource "aws_cloudwatch_log_group" "likes" {
  name              = "/aws/lambda/my-portfolio-likes-handler"
  retention_in_days = var.log_retention_days
  tags              = var.tags
}

data "aws_iam_policy_document" "likes_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "likes_lambda" {
  name               = "my-portfolio-likes-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.likes_assume_role.json
  tags               = var.tags
}

data "aws_iam_policy_document" "likes_lambda_permissions" {
  statement {
    sid     = "DynamoDB"
    actions = ["dynamodb:PutItem", "dynamodb:Query", "dynamodb:DeleteItem"]
    resources = [
      aws_dynamodb_table.likes.arn,
    ]
  }

  statement {
    sid       = "Logs"
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.likes.arn}:*"]
  }
}

resource "aws_iam_role_policy" "likes_lambda" {
  name   = "my-portfolio-likes-lambda-policy"
  role   = aws_iam_role.likes_lambda.id
  policy = data.aws_iam_policy_document.likes_lambda_permissions.json
}

resource "aws_lambda_function" "likes" {
  function_name    = "my-portfolio-likes-handler"
  role             = aws_iam_role.likes_lambda.arn
  filename         = data.archive_file.likes_lambda.output_path
  source_code_hash = data.archive_file.likes_lambda.output_base64sha256
  handler          = "index.handler"
  runtime          = "nodejs22.x"

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.likes.name
    }
  }

  tags       = var.tags
  depends_on = [aws_cloudwatch_log_group.likes]
}

resource "aws_lambda_function_url" "likes" {
  function_name      = aws_lambda_function.likes.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = false
    allow_origins     = [var.allowed_origin]
    allow_methods     = ["GET", "POST", "DELETE"]
    allow_headers     = ["Content-Type"]
    max_age           = 300
  }
}

output "likes_endpoint" {
  description = "Likes API endpoint URL - set as VITE_LIKES_ENDPOINT in .env"
  value       = aws_lambda_function_url.likes.function_url
}
