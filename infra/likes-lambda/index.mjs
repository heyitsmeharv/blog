import {
  DynamoDBClient,
  PutItemCommand,
  DeleteItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, DELETE",
};

export function createHandler(client = new DynamoDBClient({})) {
  return async (event) => {
    const TABLE_NAME = process.env.TABLE_NAME;
    const method = event.requestContext?.http?.method ?? "GET";

    if (method === "OPTIONS") {
      return { statusCode: 204, headers: CORS_HEADERS, body: "" };
    }

    try {
      if (method === "GET") return await handleGet(event, client, TABLE_NAME);
      if (method === "POST") return await handlePost(event, client, TABLE_NAME);
      if (method === "DELETE") return await handleDelete(event, client, TABLE_NAME);
      return respond(404, { error: "Not found" });
    } catch (err) {
      console.error(err);
      return respond(500, { error: "Internal server error" });
    }
  };
}

export const handler = createHandler();

async function handleGet(event, client, TABLE_NAME) {
  const qs = event.queryStringParameters ?? {};
  const { postId } = qs;

  if (!postId) {
    return respond(400, { error: "Missing required param: postId" });
  }

  const resp = await client.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: marshall({ ":pk": `POST#${postId}` }),
      Select: "COUNT",
    })
  );

  return respond(200, { count: resp.Count ?? 0 });
}

async function handlePost(event, client, TABLE_NAME) {
  const body = JSON.parse(event.body ?? "{}");
  const { postId, visitorId } = body;

  if (!postId || !visitorId) {
    return respond(400, { error: "Missing required fields: postId, visitorId" });
  }

  try {
    await client.send(
      new PutItemCommand({
        TableName: TABLE_NAME,
        Item: marshall({
          PK: `POST#${postId}`,
          SK: `VISITOR#${visitorId}`,
          postId,
          visitorId,
          timestamp: new Date().toISOString(),
        }),
        ConditionExpression:
          "attribute_not_exists(PK) AND attribute_not_exists(SK)",
      })
    );
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      return respond(409, { error: "already liked" });
    }
    throw err;
  }

  return respond(200, { ok: true });
}

async function handleDelete(event, client, TABLE_NAME) {
  const body = JSON.parse(event.body ?? "{}");
  const { postId, visitorId } = body;

  if (!postId || !visitorId) {
    return respond(400, { error: "Missing required fields: postId, visitorId" });
  }

  await client.send(
    new DeleteItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({
        PK: `POST#${postId}`,
        SK: `VISITOR#${visitorId}`,
      }),
    })
  );

  return respond(200, { ok: true });
}

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    body: JSON.stringify(body),
  };
}
