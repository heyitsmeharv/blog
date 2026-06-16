export const example = `const starWarsCharacters = [ "starwars", { starwars: [ { nameOne: "Luke", nameTwo: "Leia", nameThree: "Han" } ] }, 4, ["starwars"] ];`;
export const mapExample = `const kvpArray = [
    { key: 1, value: 10 },
    { key: 2, value: 20 },
    { key: 3, value: 30 },
  ];
  
const reformattedArray = kvpArray.map(({ key, value }) => ({ [key]: value }));

console.log(reformattedArray); // [{ 1: 10 }, { 2: 20 }, { 3: 30 }]`;
export const mapExample2 = `const wordArray = [
  { word: "Defence" },
  { word: "Color" },
  { word: "Offence" },
];

const reformattedArray = wordArray.map(item => {
  if (item.word === "Color") {
    item.word = "Colour";
  }
  return item;
});

console.log(reformattedArray); // [ { word: "Defence" }, { word: "Colour" }, { word: "Offence" } ];
`;
export const forEachExample = `const items = ["item1", "item2", "item3"];
const copyItems = [];

for (let i = 0; i < item.length; i++) {
  copyItems.push(items[i]);
}

items.forEach(item => {
  copyItems.push(item);
});`;

export const filterExample = `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const oddNumbers = numbers.filter(num => {
  return num % 2 !== 0;
});

console.log(oddNumbers); // [1, 3, 5, 7, 9]
`;
export const findExample = `const numbers = [1, 2, 3, 4, 5];

const foundNumber = numbers.find(num => {
  return num > 3;
});

console.log(foundNumber); // 4
`;
export const findExample2 = `const numbers = [1, 2, 3, 4, 5];

const foundNumber = numbers.find(num => {
  return num > 10;
});

console.log(foundNumber); // undefined
`;

export const everyExample = `const names = ["luke", "Leia", "Han", "Anakin"];

const shortNames = names.every(name => {
  return name.length < 4;
});

console.log(shortNames); // false
`;

export const someExample = `const numbers = [2, 4, 6, 7, 8];

const hasOdd = numbers.some(function(num) {
  return num % 2;
});

console.log(hasOdd); // true`;

export const reduceExample = `const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sum); // 15
`;

export const objects = `console.log(typeof({})); // object
console.log(typeof([])); // object
console.log(typeof(new Date())); // object
console.log(typeof(/\d+/)); // object
console.log(typeof(Math)); // object
`;

export const objectNotations = `let person = { 
  firstName: "Adam", 
  lastName: "Harvey", 
  age: 29 
};
person.firstName; // Adam (Dot notation)
person['firstName']; // Adam (Bracket notation)
`;

export const objectNotationsTwo = `let person = { 
  firstName: "Adam", 
  lastName: "Harvey", 
  age: 29 
};

// it's that simple!
person.age = 21;
person['age'] = 21;

person: { 
  firstName: "Adam", 
  lastName: "Harvey", 
  age: 21 
};
`;

export const createReactAppCommand = `npx create-react-app text-based-adventure`;

export const mapGeneration = `import { Rooms } from './rooms';
import { Items } from './items';
import { Enemies } from './enemies';

// used for generating the map and placing items randomly in rooms.
export const generateRooms = randomChance => {
  const rooms = [
    {
      id: 0,
      name: "Start",
      description: "This is the starting room",
      items: [],
      enemies: [],
      locked: false,
      explored: false
    }
  ];

  const listOfPotentialRooms = Rooms;
  const items = Items;
  const enemies = Enemies;

  // probably re-work the flags () at some point
  // for now let's map through and reset them
  listOfPotentialRooms.forEach(room => room.explored = false);
  items.forEach(item => item.taken = false);
  enemies.forEach(enemy => {
    enemy.killed = false
    enemy.stats.health = enemy.stats.maxHealth;
  });

  // let's loop through all of the rooms available
  for (let i = 0; i < listOfPotentialRooms.length; i++) {

    // we want to keep randomly selecting a room which hasn't been added yet
    let randomRoom = listOfPotentialRooms[Math.floor(Math.random() * listOfPotentialRooms.length)];

    // we don't want duplicate rooms added, so let's check to see if it's already been added
    if (!rooms.some(e => e.name === randomRoom.name)) {
      // randomRoom = Rooms[Math.floor(Math.random() * Rooms.length)];

      // make the room object we want to add
      const room = {
        id: i + 1,
        name: randomRoom.name,
        description: randomRoom.description,
        items: [],
        enemies: [],
        locked: randomRoom.locked,
        explored: false
      };

      // Add random items to the room.
      const randomItem = items[Math.floor(Math.random() * 21)];
      const itemSpawnChance = randomChance(0.5);

      // check to see if the item has already been added to the game
      // unless it's a consumable or usable
      for (let x = 0; x < items.length; x++) {
        const itemAlreadyExists = rooms.some(r => {
          return r[x]?.items.includes(randomItem);
        });
        if (!itemAlreadyExists) {
          if (itemSpawnChance) {
            if (!room.items.includes(randomItem)) {
              room.items.push(randomItem);
            }
          }
        }
      }

      // Add enemies to the room
      const randomEnemy = enemies[Math.floor(Math.random() * 7)];
      const enemiesSpawnChance = randomChance(0.2);
      for (let x = 0; x < enemies.length; x++) {
        if (enemiesSpawnChance) {
          if (!room.enemies.includes(randomEnemy)) {
            room.enemies.push(randomEnemy);
          }
        }
      }

      rooms.push(room);
    } else {
      // find a room that doesn't exist;
      let room;

      // loop through the whole array
      for (let x = 0; x < listOfPotentialRooms.length; x++) {
        // let's try and find a room that doesn't exist in the array
        if (!rooms.some(e => e.name === listOfPotentialRooms[x].name)) {
          // we've found it!
          room = listOfPotentialRooms[x];
          // let's add an id (make sure it's not already assigned by adding it to the end of the array)
          room.id = rooms[rooms.length - 1].id + 1;
          // select a random item
          const randomItem = items[Math.floor(Math.random() * 21)];
          // add random items to the room (implement a spawn chance).
          const itemSpawnChance = randomChance(0.5);
          for (let x = 0; x < items.length; x++) {
            const itemAlreadyExists = rooms.some(r => {
              return r[x]?.items.includes(randomItem);
            });
            if (!itemAlreadyExists) {
              if (itemSpawnChance) {
                // we don't want to place duplicate items into the room
                if (!room.items.includes(randomItem)) {
                  room.items.push(randomItem);
                }
              }
            }
          }
          // Add enemies to the room
          const randomEnemy = enemies[Math.floor(Math.random() * 7)];
          const enemiesSpawnChance = randomChance(0.2);
          for (let x = 0; x < enemies.length; x++) {
            if (enemiesSpawnChance) {
              if (!room.enemies.includes(randomEnemy)) {
                room.enemies.push(randomEnemy);
              }
            }
          }
          rooms.push(room);
        }
      }
    }
  }

  // add in the end room
  const end = {
    id: rooms[rooms.length - 1].id + 1,
    name: "End",
    description: "This is the end room",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  }

  rooms.push(end);
  return rooms;
};`;

export const roomHelper = `export const Rooms = [
  {
    name: "Torture Chamber",
    description: "This room is filled with gruesome instruments of pain and suffering, including spiked chairs, iron.",
    items: [],
    enemies: [],
    locked: false,
    explored: false,
  },
  {
    name: "Guard Room",
    description: "This room is where the guards stationed in the dungeon rest and eat. There are cots and hammocks for sleeping, and tables and benches for eating.",
    items: [],
    enemies: [],
    locked: false,
    explored: false,
  },
  {
    name: "Holding Cells",
    description: "These small cells are used to hold prisoners awaiting trial or punishment. They are dark, cramped, and have a foul smell.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Execution Chamber",
    description: "This room is where prisoners are brought to be executed. There is a trapdoor in the floor, a noose hanging from the ceiling, and a chopping block.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Alchemy Lab",
    description: "This room is where the dungeon's alchemist conducts experiments and brews potions. There are cauldrons, alembics, and retorts scattered around the room.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Armory",
    description: "This room is where the dungeon's weapons and armor are stored. There are racks of swords, spears, and shields, as well as suits of armor and crossbows.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Treasure Vault",
    description: "This room is where the dungeon's most valuable treasures are kept. There are piles of gold and silver coins, precious jewels, and ornate chests.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Torture Garden",
    description: "This outdoor space is used for outdoor punishments, such as flogging, whipping, and other forms of physical torture. There are posts and stakes set up for this purpose.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Crypt",
    description: "This underground chamber is used for waste disposal. It is filled with rats, cockroaches, and other vermin.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Sewer",
    description: "This underground chamber is used for waste disposal. It is filled with rats, cockroaches, and other vermin.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Training Room",
    description: "This room is where the dungeon's guards train and practice their combat skills. There are dummies, targets, and other equipment for this purpose.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Interrogation Room",
    description: "This room is used to extract information from prisoners. There are tables, chairs, and instruments of torture.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Throne Room:",
    description: "This room is where the dungeon's ruler sits on their throne. There are banners, tapestries, and other decorations on the walls.",
    items: [],
    enemies: [],
    locked: true,
    explored: false
  },
  {
    name: "Library",
    description: "This room is where the dungeon's records and books are kept. There are shelves filled with books, scrolls, and maps.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Barracks",
    description: "This room is where the dungeon's guards sleep and eat. There are bunk beds, tables, and benches.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Courtroom",
    description: "This room is where trials are held. There is a judge's bench, a jury box, and seating for spectators.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
  {
    name: "Guard Tower",
    description: "This tall tower overlooks the surrounding area. Guards stationed here can watch for intruders or potential escapes.",
    items: [],
    enemies: [],
    locked: false,
    explored: false
  },
]`;

export const partitionsInAthena = `CREATE EXTERNAL TABLE sales (
  product_id STRING,
  amount DOUBLE
)
PARTITIONED BY (year STRING, month STRING)
STORED AS PARQUET
LOCATION 's3://my-bucket/sales/';
`;

export const columnarFormat = `CREATE TABLE sales_parquet
STORED AS PARQUET
AS SELECT * FROM sales;
`;

export const SSMLExample = `<speak>
Hello, <emphasis level="strong">world!</emphasis>
Welcome to <break time="1s"/> Amazon Polly.
</speak>
`;

export const cloudwatchlogsInsights = `fields @timestamp, @message
| filter @message like /error/
| sort @timestamp desc
| limit 20
`;

export const cloudwatchlogsAlarmStatus = `aws cloudwatch set-alarm-state 
--alarm-name "myalarm" 
--state-value ALARM 
--state-reason "testing purposes"
`;

export const bashEnvironment = `echo $SHELL`;
export const powershell = `$PSVersionTable`;
export const bashVersion = `bash --version`;
export const bashOutput = `ls > files.txt`;
export const bashAppend = `echo "Backup completed" >> logs.txt`;
export const bashFeed = `sort < names.txt`;
export const bashFeed2 = `while read user; do
  echo "Hello $user"
done < users.txt
`;
export const bashFeedAlt = `cat users.txt | while read user; do echo "Hello $user"; done`;
export const bashRedirectErr = `find ~ -name "config.json" > results.txt 2> errors.txt`;
export const bashRedirectErr2 = `find ~ -name "config.json" > all_output.txt 2>&1`;
export const bashMixingMatching = `sort < input.txt | uniq > cleaned.txt`;
export const bashFileDescriptors = `exec 3>log.txt
echo "Hello log" >&3
exec 3>&-
`;
export const bashPipe = `ls | grep "log"`;
export const bashFirstScript = `#!/bin/bash
# A simple hello world script

echo "Hello, world!"`;
export const bashFirstScript2 = `chmod +x hello.sh`;
export const bashFirstScript3 = `./hello.sh`;
export const bashFirstScript4 = `Hello, world!`;
export const pythonScript = `#!/usr/bin/python3`;

export const bashProjectSetup = `my_project/
├── src/
├── logs/
├── data/
└── README.md`;
export const bashProjectSetup2 = `#!/bin/bash

mkdir -p my_project/{src,logs,data}
touch my_project/README.md
echo "Project folder created successfully."`;
export const bashProjectSetup3 = `chmod +x setup_project.sh`;
export const bashProjectSetup4 = `./setup_project.sh`;
export const bashUserInput = `#!/bin/bash

name="Adam"
echo "Hello, $name!"

read -p "Enter your favourite language: " lang
echo "You love $lang!"
`;
export const bashCommandSubstitution = `today=$(date)
echo "Today is $today"`;
export const bashPassingArguments = `#!/bin/bash

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "Total arguments: $#"
`;
export const bashPassingArguments2 = `./args.sh apple banana`;
export const bashPassingArguments3 = `Script name: ./args.sh
First argument: apple
Second argument: banana
Total arguments: 2
`;
export const bashSystemInfo = `#!/bin/bash

echo "System Report for: $(hostname)"
echo "User: $(whoami)"
echo "Memory usage:"
systeminfo | grep "Total Physical Memory"
echo "Disk usage:"
df -h`;
export const bashSystemInfo2 = `chmod +x sysinfo.sh
./sysinfo.sh`;
export const bashSystemInfo3 = `System Report for: dev-machine
User: adam
Memory usage:
Total Physical Memory: 16,298 MB
Disk usage: 
Filesystem            Size  Used Avail Use% Mounted on
D:/Program Files/Git  932G  251G  682G  27%    /
C:                    465G  334G  131G  72%    /c`;
export const bashIf = `if [ condition ]; then
  # commands to run if true
fi`;
export const bashIf2 = `#!/bin/bash

if [ -f "/etc/passwd" ]; then
  echo "The file exists!"
else
  echo "File not found."
fi`;
export const bashIfElse = `#!/bin/bash

read -p "Enter a number: " num

if [ $num -gt 10 ]; then
  echo "That's a big number!"
elif [ $num -gt 5 ]; then
  echo "That's a medium number."
else
  echo "That's a small number."
fi`;
export const bashCombiningConditions = `#!/bin/bash

file="notes.txt"

if [ -f "$file" ] && [ -r "$file" ]; then
  echo "$file exists and is readable."
else
  echo "File missing or unreadable."
fi`;
export const bashCaseStatement = `#!/bin/bash

read -p "Enter a letter (a, b, or c): " choice

case $choice in
  a) echo "You chose option A" ;;
  b) echo "You chose option B" ;;
  c) echo "You chose option C" ;;
  *) echo "Invalid choice" ;;
esac`;
export const bashForLoop = `#!/bin/bash

for file in *.txt; do
  echo "Found file: $file"
done`;
export const bashForLoop2 = `for i in {1..5}; do
  echo "Count: $i"
done`;
export const bashWhileLoop = `#!/bin/bash

count=1
while [ $count -le 5 ]; do
  echo "Loop #$count"
  ((count++))
done`;
export const bashWhileLoop2 = `#!/bin/bash

while read line; do
  echo "Line: $line"
done < input.txt`;
export const bashUntilLoop = `#!/bin/bash

n=1
until [ $n -gt 3 ]; do
  echo "Number $n"
  ((n++))
done`;
export const bashLoopExample = `#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"

read -p "Enter directory to clean (default: script directory): " dir
dir=\${dir:-\$SCRIPT_DIR}

read -p "Delete files older than how many days? " days

if [ ! -d "\$dir" ]; then
  echo "Directory not found: \$dir"
  exit 1
fi

echo "Cleaning up \$dir..."
find "\$dir" -type f -mtime +\$days -exec rm -v {} \\;

echo "Cleanup complete."`;
export const bashFunctions = `greet() {
  local name="$1"
  echo "Hello, $name"
}

greet "Adam"`;
export const bashReturnDataOrState = `sum() {
  local a="$1" b="$2"
  # Return data
  echo $((a + b))
}

validate_positive() {
  local n="$1"
  [[ "$n" -gt 0 ]] || return 1
}

result="$(sum 5 7)"          # "12"
if validate_positive "$result"; then
  echo "Positive sum: $result"
else
  echo "Not positive"
fi`;
export const bashFailGracefully = `set -euo pipefail`;
export const bashExplicitlyFail = `some_command || echo "non-fatal: some_command failed"`;
export const bashTrap = `cleanup() {
  rm -f "$TMP_FILE"
}

trap cleanup EXIT INT TERM

TMP_FILE="$(mktemp)"
echo "Working in $TMP_FILE"
# ... do work ...`;
export const bashTinyLoggingHelper = `log() {
  local level="$1"; shift
  printf '%s [%s] %s\n' "$(date +'%Y-%m-%d %H:%M:%S')" "$level" "$*"
}

log INFO  "Starting job"
log WARN  "Disk usage high"
log ERROR "Backup failed"`;
export const bashTinyLoggingHelper2 = `LOG_FILE="\${LOG_FILE:-/tmp/script.log}"
logf() { log "$@" | tee -a "$LOG_FILE"; }  # prints & appends to file`;
export const bashReusableTemplate = `#!/usr/bin/env bash
set -euo pipefail

# Resolve script dir (works when called from anywhere)
SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"

LOG_FILE="\${LOG_FILE:-$SCRIPT_DIR/script.log}"

log() {
  local level="$1"; shift
  printf '%s [%s] %s\n' "$(date +'%Y-%m-%d %H:%M:%S')" "$level" "$*"
}

logf() { log "$@" | tee -a "$LOG_FILE"; }

cleanup() {
  logf INFO "Cleanup complete."
}
trap cleanup EXIT INT TERM

require() {
  command -v "$1" >/dev/null 2>&1 || {
    logf ERROR "Missing dependency: $1"
    exit 127
  }
}

# Example dependency checks (comment out if not needed)
# require curl
# require awk

main() {
  logf INFO "Script dir: $SCRIPT_DIR"
  # your logic here
}

main "$@"`;
export const bashValidatingInputs = `usage() {
  echo "Usage: $0 <source_dir> <days>"
  echo "Example: $0 /var/log 7"
}

[[ $# -eq 2 ]] || { usage; exit 64; }  # 64 = EX_USAGE

SRC="$1"
DAYS="$2"

[[ -d "$SRC" ]] || { echo "Not a directory: $SRC"; exit 66; }  # 66 = NOINPUT-ish
[[ "$DAYS" =~ ^[0-9]+$ ]] || { echo "Days must be an integer"; exit 65; }`;
export const bashHandlingExpectedFailures = `if ! grep -q "pattern" file.txt 2>/dev/null; then
  echo "Pattern not found (that's okay)."
fi`;
export const bashHandlingExpectedFailures2 = `mkdir -p "$DIR" || true`;
export const bashSafeLogger = `#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="\${LOG_FILE:-$SCRIPT_DIR/archive.log}"

log() {
  local level="$1"; shift
  printf '%s [%s] %s\n' "$(date +'%Y-%m-%d %H:%M:%S')" "$level" "$*"
}
logf() { log "$@" | tee -a "$LOG_FILE"; }

cleanup() {
  logf INFO "Exiting."
}
trap cleanup EXIT INT TERM

usage() {
  echo "Usage: $0 [target_dir] [days]"
  echo "Default target_dir: script directory"
  echo "Example: $0 /var/log 7"
}

TARGET="\${1:-$SCRIPT_DIR}"
DAYS="\${2:-7}"

if [[ ! -d "$TARGET" ]]; then
  logf ERROR "Not a directory: $TARGET"
  usage; exit 64
fi

if ! [[ "$DAYS" =~ ^[0-9]+$ ]]; then
  logf ERROR "Days must be an integer, got '$DAYS'"
  usage; exit 65
fi

ARCHIVE_DIR="$SCRIPT_DIR/archives"
mkdir -p "$ARCHIVE_DIR"

STAMP="$(date +'%Y%m%d_%H%M%S')"
ARCHIVE_PATH="$ARCHIVE_DIR/logs_\${STAMP}.tar.gz"

logf INFO "Target: $TARGET"
logf INFO "Archiving files older than $DAYS days"
logf INFO "Output: $ARCHIVE_PATH"

# Find candidate files (text-ish logs), ignore the archive dir itself
mapfile -t files < <(find "$TARGET" -type f -mtime +"$DAYS" ! -path "$ARCHIVE_DIR/*" 2>/dev/null || true)

if (( \${#files[@]} == 0 )); then
  logf WARN "No files older than $DAYS days found. Nothing to do."
  exit 0
fi

# Create tar.gz
tar -czf "$ARCHIVE_PATH" -C "/" "\${files[@]/#\//}"  # preserve paths
logf INFO "Archived \${#files[@]} files."

# Optional: remove originals after successful archive
# for f in "\${files[@]}"; do rm -v "$f"; done

logf INFO "Done."`;
export const bashDebugMode = `bash -x script.sh`;
export const bashDebugMode2 = `set -x   # turn debugging on
# commands here
set +x   # turn debugging off`;
export const bashDebugMode3 = `export var='+ \${BASH_SOURCE}:\${LINENO}:\${FUNCNAME[0]}: '
set -x
`;
export const bashTrapDebug = `trap 'echo "Running: $BASH_COMMAND"' DEBUG`;
export const bashWildcards = `touch file1.txt file2.txt fileA.log fileB.log
echo *.log`;
export const bashWildcards2 = `echo "*.log"`;
export const bashWildcardsText = ` ls *.{jpg,png}`;
export const bashLoggingDebugOutput = `log DEBUG "Variable dir=$dir"`;
export const bashLoggingDebugOutput2 = `exec 5>debug.log
BASH_XTRACEFD=5
set -x
`;
export const bashNullGlob = `shopt -s nullglob`;
export const bashGrep = `grep "error" /var/log/syslog`;
export const bashGrep2 = `grep -i "failed" auth.log            # find failed logins
grep -rn "TODO" ~/projects           # search all files for TODOs
grep -v "DEBUG" app.log              # exclude debug lines
`;
export const bashSed = `sed 's/old/new/' file.txt`;
export const bashSed2 = `sed -i 's/foo/bar/g' config.txt`;
export const bashSed3 = `sed '/DEBUG/d' log.txt              # delete lines containing DEBUG
sed '/ERROR/i ---- NEW SECTION ----' log.txt  # insert before matches`;
export const bashAwk = `awk '{print $1, $3}' data.txt`;
export const bashAwk2 = `awk -F, '{print $1, $2}' users.csv`;
export const bashAwk3 = `awk '$3 > 80 {print $1, $3}' scores.txt`;
export const bashGrepSedAwk = `grep "$(date +%Y-%m-%d)" app.log | grep "ERROR" | wc -l`;
export const bashGrepSedAwk2 = `ps aux | grep nginx | awk '{print $2, $11}'`;
export const bashCleaningCSVData = `id,name,email,signup_date
1,Adam Harvey,adam@example.com,2025-05-12
2,Jane Doe,jane@example,2025-05-13
3,Tom, ,2025-05-14
`;
export const bashCleaningCSVData2 = `cat users.csv \
  | grep -E ".+@.+" \
  | sed 's/@example$/@example.com/' \
  | awk -F, 'NR>1 {print $2 " <" $3 ">"}'
`;
export const bashCleaningCSVDataText = `awk -F, 'NR>1 \{print $2 " <" $3 ">"}'`;
export const bashCleaningCSVData3 = `Adam Harvey <adam@example.com>
Jane Doe <jane@example.com>`;
export const bashPing = `ping google.com`;
export const bashPing2 = `ping -c 4 google.com`;
export const bashPing3 = `#!/usr/bin/env bash

HOST="google.com"

if ping -c 1 "$HOST" &>/dev/null; then
  echo "$HOST is reachable."
else
  echo "$HOST is down!"
fi
`;
export const bashCurl = `curl https://heyitsmeharv.com`;
export const bashCurl2 = `curl -O https://heyitsmeharv.com/index.html`;
export const bashCurl3 = `curl https://api.github.com/users/octocat`;
export const bashCurl4 = `curl -v https://api.github.com`;
export const bashCurl5 = `#!/usr/bin/env bash

URL="https://heyitsmeharv.com"
STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$URL")

if [ "$STATUS" -eq 200 ]; then
  echo "$URL is up (HTTP $STATUS)"
else
  echo "$URL might be down (HTTP $STATUS)"
fi`;
export const bashCurl6 = `PRICE=$(curl -s https://api.coindesk.com/v1/bpi/currentprice.json | grep -o '"rate":"[0-9.,]*"' | head -1)
echo "Current Bitcoin price: \${PRICE#*:}"`;
export const bashCurl7 = `curl -s https://api.coindesk.com/v1/bpi/currentprice.json | jq '.bpi.USD.rate'`;
export const bashSCP = `scp backup.tar.gz user@server:/home/user/backups/`;
export const bashSCP2 = `rsync -avz ./site/ user@server:/var/www/html/`;
export const bashNC = `nc -zv heyitsmeharv.com 22`;
export const bashNC2 = `while true; do
  nc -z heyitsmeharv.com 80 && echo "Web server is up" || echo "Down"
  sleep 10
done
`;
export const bashDig = `dig heyitsmeharv.com +short`;
export const bashDig2 = `dig heyitsmeharv.com MX +short`;
export const bashDig3 = `if ! dig +short google.com >/dev/null; then
  echo "DNS resolution failed!"
  exit 1
fi
`;
export const bashMonitoring = `#!/usr/bin/env bash
set -euo pipefail

HOST="google.com"
LOG="network.log"

timestamp() { date +"%Y-%m-%d %H:%M:%S"; }

{
  echo "$(timestamp) Checking $HOST..."
  if ping -c 1 "$HOST" &>/dev/null; then
    echo "$(timestamp) Ping OK"
    STATUS=$(curl -o /dev/null -s -w "%{http_code}" "https://$HOST")
    echo "$(timestamp) HTTP Status: $STATUS"
  else
    echo "$(timestamp) Ping failed"
  fi
  echo
} >> "$LOG"
`;

// AWS Multi-Account Setup
export const awsMultiAccountSCPDenyGuardDuty = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyDisableGuardDuty",
      "Effect": "Deny",
      "Action": [
        "guardduty:DeleteDetector",
        "guardduty:DisassociateFromAdministratorAccount",
        "guardduty:StopMonitoringMembers",
        "guardduty:UpdateDetector"
      ],
      "Resource": "*"
    }
  ]
}`;

export const awsMultiAccountSCPDenyRegions = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyNonApprovedRegions",
      "Effect": "Deny",
      "NotAction": [
        "iam:*",
        "organizations:*",
        "account:*",
        "sts:*",
        "support:*",
        "health:*",
        "route53:*",
        "cloudfront:*"
      ],
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": [
            "eu-west-1",
            "us-east-1"
          ]
        }
      }
    }
  ]
}`;

export const awsMultiAccountSCPDenyRoot = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyRootUser",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringLike": {
          "aws:PrincipalArn": [
            "arn:aws:iam::*:root"
          ]
        }
      }
    }
  ]
}`;

export const awsMultiAccountTerraformDeployRoleTrust = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::MANAGEMENT_ACCOUNT_ID:root"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "terraform-deploy"
        }
      }
    }
  ]
}`;

export const awsMultiAccountGitHubOIDCRole = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::MANAGEMENT_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:your-org/your-repo:ref:refs/heads/main"
        }
      }
    }
  ]
}`;

export const awsMultiAccountTerraformProviderAssumeRole = `provider "aws" {
  region = "eu-west-1"

  assume_role {
    role_arn     = "arn:aws:iam::\${var.target_account_id}:role/TerraformDeployRole"
    session_name = "terraform-\${var.environment}"
  }
}`;

export const awsMultiAccountTagPolicy = `{
  "tags": {
    "env": {
      "tag_key": {
        "@@assign": "env"
      },
      "tag_value": {
        "@@assign": [
          "dev",
          "stage",
          "prod"
        ]
      },
      "enforced_for": {
        "@@assign": [
          "ec2:instance",
          "s3:bucket",
          "lambda:function",
          "rds:db"
        ]
      }
    }
  }
}`;

// ── AWS Patch Management ──────────────────────────────────────────────────────

export const awsPatchManagementCLIPackageManager = `# See which security patches are available on this instance
sudo dnf list --security

# List CVE IDs attached to each available security update
sudo dnf updateinfo list security

# Apply only security-relevant patches (no interactive prompt)
sudo dnf update --security -y

# Check which packages would be updated without applying anything
sudo dnf check-update --security`;

export const awsPatchManagementTerraformIAMRole = `# Every EC2 instance managed by SSM needs this instance profile.
# AmazonSSMManagedInstanceCore is the minimum — it grants:
#   - registration with SSM Fleet Manager
#   - agent self-updates from S3
#   - Run Command execution
#   - CloudWatch Logs output

resource "aws_iam_role" "ssm_instance" {
  name = "\${var.name}-\${var.environment}-ssm-instance"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ssm_managed_instance_core" {
  role       = aws_iam_role.ssm_instance.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ssm_instance" {
  name = "\${var.name}-\${var.environment}-ssm-instance"
  role = aws_iam_role.ssm_instance.name
}`;

export const awsPatchManagementTerraformVPCEndpoints = `# Only needed for instances in private subnets WITHOUT a NAT gateway.
# Cost: ~£0.008/endpoint/AZ/hour × 3 endpoints × 2 AZs ≈ £35/month.
# If your instances already have outbound HTTPS via NAT, skip this block.

resource "aws_vpc_endpoint" "ssm" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.\${data.aws_region.current.name}.ssm"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = var.private_subnet_ids
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "ec2messages" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.\${data.aws_region.current.name}.ec2messages"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = var.private_subnet_ids
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  private_dns_enabled = true
}

resource "aws_vpc_endpoint" "ssmmessages" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.\${data.aws_region.current.name}.ssmmessages"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = var.private_subnet_ids
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  private_dns_enabled = true
}`;

export const awsPatchManagementTerraformBaseline = `locals {
  # prod waits 14 days; everything else waits 7.
  # Combined with staggered windows (dev Fri → stage Sat → prod Sun),
  # this gives an effective ~21-day soak from patch release to production.
  approve_days = var.approve_after_days != null ? var.approve_after_days : (
    var.environment == "prod" ? 14 : 7
  )
}

resource "aws_ssm_patch_baseline" "this" {
  name             = "\${var.name}-\${var.environment}"
  operating_system = "AMAZON_LINUX_2023"
  description      = "Patch baseline — \${local.approve_days}-day soak"

  approval_rule {
    approve_after_days  = local.approve_days
    compliance_level    = "CRITICAL"
    enable_non_security = false

    patch_filter {
      key    = "CLASSIFICATION"
      values = ["Security", "Bugfix"]
    }

    patch_filter {
      key    = "SEVERITY"
      values = ["Critical", "High", "Medium"]
    }
  }

  # Packages listed here will never be installed, even if they match an
  # approval rule. BLOCK prevents installation entirely (vs ALLOW_AS_DEPENDENCY).
  rejected_patches        = var.rejected_patches
  rejected_patches_action = "BLOCK"
}`;

export const awsPatchManagementTerraformPatchGroup = `# The patch group links a baseline to a set of instances via a tag.
# One patch group maps to exactly one baseline.

resource "aws_ssm_patch_group" "this" {
  baseline_id = aws_ssm_patch_baseline.this.id
  patch_group = "\${var.name}-\${var.environment}"
}

# ── In your EC2 Launch Template ───────────────────────────────────────────────
# Tag every instance at launch so SSM knows which baseline to use.
# For existing running instances: add the tag directly — SSM picks it up
# on the next scan cycle within an hour, no restart required.

resource "aws_launch_template" "app" {
  # ... other config ...

  tag_specifications {
    resource_type = "instance"
    tags = {
      PatchGroup = "\${var.name}-\${var.environment}"
    }
  }
}`;

export const awsPatchManagementTerraformMaintenanceWindow = `# All cron expressions are evaluated in UTC.
# Recommended stagger:
#   dev:   cron(0 22 ? * FRI *)   — Friday  22:00 UTC
#   stage: cron(0 1  ? * SAT *)   — Saturday 01:00 UTC
#   prod:  cron(0 2  ? * SUN *)   — Sunday  02:00 UTC

resource "aws_ssm_maintenance_window" "this" {
  name     = "\${var.name}-\${var.environment}"
  schedule = var.maintenance_window_schedule   # e.g. cron(0 2 ? * SUN *)
  duration = 4                                 # total window length in hours
  cutoff   = 1                                 # stop new tasks 1 hr before end
}

resource "aws_ssm_maintenance_window_target" "this" {
  window_id     = aws_ssm_maintenance_window.this.id
  resource_type = "INSTANCE"

  # Target by tag, not instance ID — durable across instance replacements
  targets {
    key    = "tag:PatchGroup"
    values = ["\${var.name}-\${var.environment}"]
  }
}

# Priority 1 — Install patches
resource "aws_ssm_maintenance_window_task" "patch" {
  window_id        = aws_ssm_maintenance_window.this.id
  task_type        = "RUN_COMMAND"
  task_arn         = "AWS-RunPatchBaseline"
  priority         = 1
  service_role_arn = aws_iam_role.maintenance_window.arn
  max_concurrency  = "50%"   # patch at most 50% of the fleet at a time
  max_errors       = "20%"   # abort if more than 20% of instances fail

  targets {
    key    = "WindowTargetIds"
    values = [aws_ssm_maintenance_window_target.this.id]
  }

  task_invocation_parameters {
    run_command_parameters {
      cloudwatch_config {
        cloudwatch_log_group_name = aws_cloudwatch_log_group.patch.name
        cloudwatch_output_enabled = true
      }

      # SNS notification on task timeout, cancellation, or failure
      dynamic "notification_config" {
        for_each = var.sns_email != "" ? [1] : []
        content {
          notification_arn    = aws_sns_topic.alerts.arn
          notification_events = ["TimedOut", "Cancelled", "Failed"]
          notification_type   = "Command"
        }
      }

      parameter {
        name   = "Operation"
        values = ["Install"]
      }

      # RebootIfNeeded is correct — NoReboot leaves InstalledPendingReboot
      # states where the old vulnerable binary is still running in memory
      parameter {
        name   = "RebootOption"
        values = ["RebootIfNeeded"]
      }
    }
  }
}`;

export const awsPatchManagementTerraformScanAssociation = `# Runs AWS-RunPatchBaseline in Scan mode every hour.
# Scan reads installed packages, compares against the baseline, and writes
# the result to the compliance dashboard — without installing anything.
# Without this association, the dashboard only updates when the weekly
# maintenance window fires.

resource "aws_ssm_association" "scan" {
  name             = "AWS-RunPatchBaseline"
  association_name = "\${var.name}-\${var.environment}-scan"

  schedule_expression = "rate(1 hour)"

  targets {
    key    = "tag:PatchGroup"
    values = ["\${var.name}-\${var.environment}"]
  }

  parameters = {
    Operation = "Scan"
  }

  output_location {
    s3_bucket_name = aws_s3_bucket.patch_logs.bucket
    s3_key_prefix  = "scans/"
  }
}`;

export const awsPatchManagementCLIComplianceStates = `# Per-patch states for a specific instance
aws ssm describe-instance-patch-states \\
  --instance-ids i-0abc1234567890def \\
  --query 'InstancePatchStates[].{Instance:InstanceId,Missing:MissingCount,Failed:FailedCount,PendingReboot:InstalledPendingRebootCount,Installed:InstalledCount}'

# All non-compliant instances across the patch group
aws ssm list-resource-compliance-summaries \\
  --filters "Key=ComplianceType,Values=Patch,Type=EQUAL" \\
            "Key=Status,Values=NON_COMPLIANT,Type=EQUAL" \\
  --query 'ResourceComplianceSummaryItems[].{Instance:ResourceId,Status:Status,PatchGroup:ExecutionSummary.ExecutionId}'

# Instances with patches pending reboot (false-compliance risk)
aws ssm list-resource-compliance-summaries \\
  --filters "Key=ComplianceType,Values=Patch,Type=EQUAL" \\
  --query 'ResourceComplianceSummaryItems[?ComplianceSummary.CompliantSummary.SeveritySummary != \`null\`]' \\
  | jq '[.[] | select(.ComplianceSummary.NonCompliantSummary.SeveritySummary.InformationalCount > 0)]'`;

export const awsPatchManagementTerraformInspector = `# Inspector v2 uses the SSM Agent's software inventory to read installed
# packages and cross-reference them against the NVD + threat intelligence feeds.
# No separate scanner needed — the SSM agent you've already set up is enough.

resource "aws_inspector2_enabler" "this" {
  account_ids    = [data.aws_caller_identity.current.account_id]
  resource_types = ["EC2", "ECR"]
}

# EventBridge routes Critical Inspector findings to SNS within minutes —
# no waiting for a weekly compliance report.
resource "aws_cloudwatch_event_rule" "inspector_critical" {
  name        = "\${var.name}-\${var.environment}-inspector-critical"
  description = "Alert immediately on Inspector Critical findings"

  event_pattern = jsonencode({
    source      = ["aws.inspector2"]
    detail-type = ["Inspector2 Finding"]
    detail = {
      severity = ["CRITICAL"]
    }
  })
}

resource "aws_cloudwatch_event_target" "inspector_critical" {
  rule      = aws_cloudwatch_event_rule.inspector_critical.name
  target_id = "patch-alerts-sns"
  arn       = aws_sns_topic.alerts.arn   # defined in alerting.tf
}`;

export const awsPatchManagementTerraformPrePatchTask = `# Priority 0 — runs before the patch install task.
# Snapshots all EBS volumes attached to each instance so you have a
# restore point if a patch causes an issue. Conditional on var.pre_patch_snapshot.
#
# The instance role (ssm_instance) carries ec2:CreateSnapshot permission.
# For stateless ASG fleets, set pre_patch_snapshot = false — rollback is a
# Launch Template version revert + instance refresh, not a snapshot restore.

resource "aws_ssm_maintenance_window_task" "snapshot" {
  count            = var.pre_patch_snapshot ? 1 : 0
  window_id        = aws_ssm_maintenance_window.this.id
  task_type        = "RUN_COMMAND"
  task_arn         = "AWS-RunShellScript"
  priority         = 0
  service_role_arn = aws_iam_role.maintenance_window.arn
  max_concurrency  = var.max_concurrency
  max_errors       = var.max_errors

  targets {
    key    = "WindowTargetIds"
    values = [aws_ssm_maintenance_window_target.this.id]
  }

  task_invocation_parameters {
    run_command_parameters {
      parameter {
        name = "commands"
        values = [
          "#!/bin/bash",
          "set -e",
          "INSTANCE_ID=$(curl -s http://169.254.169.254/latest/meta-data/instance-id)",
          "REGION=$(curl -s http://169.254.169.254/latest/meta-data/placement/region)",
          "VOLUMES=$(aws ec2 describe-instances --instance-id \\"$INSTANCE_ID\\" --region \\"$REGION\\" --query 'Reservations[0].Instances[0].BlockDeviceMappings[*].Ebs.VolumeId' --output text)",
          "for VOLUME_ID in $VOLUMES; do",
          "  SNAP_ID=$(aws ec2 create-snapshot --volume-id \\"$VOLUME_ID\\" --description \\"pre-patch-$INSTANCE_ID-$(date +%Y%m%d%H%M)\\" --region \\"$REGION\\" --query 'SnapshotId' --output text)",
          "  echo \\"Created snapshot $SNAP_ID for volume $VOLUME_ID\\"",
          "done",
        ]
      }
    }
  }
}`;

export const awsPatchManagementTerraformPostPatchTask = `# Priority 2 — runs after the patch install task.
# Curls the application health check endpoint and exits non-zero on failure.
# If enough instances fail (> max_errors), the maintenance window execution
# is marked Failed — a clear automated signal without manual inspection.

resource "aws_ssm_maintenance_window_task" "health_check" {
  count            = var.post_patch_health_check_url != "" ? 1 : 0
  window_id        = aws_ssm_maintenance_window.this.id
  task_type        = "RUN_COMMAND"
  task_arn         = "AWS-RunShellScript"
  priority         = 2
  service_role_arn = aws_iam_role.maintenance_window.arn
  max_concurrency  = var.max_concurrency
  max_errors       = var.max_errors

  targets {
    key    = "WindowTargetIds"
    values = [aws_ssm_maintenance_window_target.this.id]
  }

  task_invocation_parameters {
    run_command_parameters {
      parameter {
        name = "commands"
        values = [
          "#!/bin/bash",
          "set -e",
          "URL='\${var.post_patch_health_check_url}'",
          "HTTP_STATUS=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 \\"$URL\\")",
          "if [ \\"$HTTP_STATUS\\" -ne 200 ]; then",
          "  echo \\"Health check FAILED: HTTP $HTTP_STATUS from $URL\\"",
          "  exit 1",
          "fi",
          "echo \\"Health check PASSED: HTTP $HTTP_STATUS\\"",
        ]
      }
    }
  }
}`;

export const awsPatchManagementCLIEmergencyPatch = `# A Critical CVE has dropped and you can't wait for Sunday's maintenance window.
# This fires AWS-RunPatchBaseline with Operation=Install immediately against
# every instance in the patch group.

# 1. Trigger — targets all instances tagged PatchGroup=my-app-prod
aws ssm send-command \\
  --document-name "AWS-RunPatchBaseline" \\
  --targets "Key=tag:PatchGroup,Values=my-app-prod" \\
  --parameters '{"Operation":["Install"],"RebootOption":["RebootIfNeeded"]}' \\
  --comment "Emergency patch CVE-2021-44228" \\
  --output-s3-bucket-name my-patch-logs \\
  --output-s3-key-prefix emergency/ \\
  --query 'Command.CommandId' \\
  --output text

# 2. Monitor — poll until all invocations complete
aws ssm list-command-invocations \\
  --command-id <command-id-from-above> \\
  --details \\
  --query 'CommandInvocations[].{Instance:InstanceId,Status:Status,Output:CommandPlugins[0].Output}'

# 3. Confirm — verify compliance state updated to Installed
aws ssm list-resource-compliance-summaries \\
  --filters "Key=ComplianceType,Values=Patch,Type=EQUAL" \\
            "Key=Status,Values=NON_COMPLIANT,Type=EQUAL" \\
  --query 'ResourceComplianceSummaryItems[].{Instance:ResourceId,Missing:ComplianceSummary.NonCompliantSummary.SeveritySummary}'`;

export const awsPatchManagementTerraformImageBuilder = `# Custom hardening component — removes unnecessary packages and captures
# the full RPM manifest for audit / CVE diffing
resource "aws_imagebuilder_component" "hardening" {
  name     = "\${var.name}-\${var.environment}-hardening"
  platform = "Linux"
  version  = "1.0.0"

  data = <<-YAML
    name: al2023-hardening
    schemaVersion: 1.0
    phases:
      - name: build
        steps:
          - name: RemoveUnnecessaryPackages
            action: ExecuteBash
            inputs:
              commands:
                - |
                  for pkg in telnet rsh ypbind tftp-server; do
                    rpm -q "$pkg" &>/dev/null && dnf remove -y "$pkg"
                  done
          - name: CaptureRpmManifest
            action: ExecuteBash
            inputs:
              commands:
                - rpm -qa --queryformat '%{NAME}|%{VERSION}|%{RELEASE}\\n' | sort > /tmp/rpm-manifest.txt
  YAML
}

# Recipe = base AMI + AWS-managed patch component + custom hardening
resource "aws_imagebuilder_image_recipe" "this" {
  name         = "\${var.name}-\${var.environment}"
  version      = "1.0.0"
  parent_image = var.image_builder_base_ami_id   # latest al2023-ami-*-x86_64

  component {
    # AWS-managed: runs dnf update && dnf upgrade
    component_arn = "arn:aws:imagebuilder:\${data.aws_region.current.name}:aws:component/update-linux/x.x.x/1"
  }

  component {
    component_arn = aws_imagebuilder_component.hardening.arn
  }
}

resource "aws_imagebuilder_infrastructure_configuration" "this" {
  name                  = "\${var.name}-\${var.environment}"
  instance_profile_name = aws_iam_instance_profile.image_builder.name
  instance_types        = ["t3.small", "t3.medium"]   # t3.micro can OOM during dnf
  subnet_id             = var.image_builder_subnet_id
  sns_topic_arn         = aws_sns_topic.alerts.arn     # notify on build failure
  terminate_instance_on_failure = true
}

resource "aws_imagebuilder_distribution_configuration" "this" {
  name = "\${var.name}-\${var.environment}"

  distribution {
    region = data.aws_region.current.name

    ami_distribution_configuration {
      name = "\${var.name}-\${var.environment}-{{ imagebuilder:buildDate }}"
      ami_tags = {
        Name      = "\${var.name}-\${var.environment}"
        BuiltBy   = "EC2ImageBuilder"
        BaselineId = aws_ssm_patch_baseline.this.id
      }
    }
  }
}

resource "aws_imagebuilder_image_pipeline" "this" {
  name                             = "\${var.name}-\${var.environment}"
  image_recipe_arn                 = aws_imagebuilder_image_recipe.this.arn
  infrastructure_configuration_arn = aws_imagebuilder_infrastructure_configuration.this.arn
  distribution_configuration_arn   = aws_imagebuilder_distribution_configuration.this.arn

  # Weekly Sunday 01:00 UTC — before the prod maintenance window (02:00 UTC)
  schedule {
    schedule_expression = "cron(0 1 ? * SUN *)"
  }

  # Inspector scans the newly-built AMI before distribution.
  # If Critical findings are found, the pipeline fails — preventing a
  # vulnerable AMI from reaching your ASG.
  image_scanning_configuration {
    image_scanning_enabled = true
  }
}`;

export const awsPatchManagementTerraformImageBuilderIAM = `# The build instance assumes this role during AMI construction.
# Three managed policies cover:
#   EC2InstanceProfileForImageBuilder    — Image Builder execution permissions
#   AmazonSSMManagedInstanceCore         — SSM Agent (required for build connectivity)
#   EC2ImageBuilderLifecycleExecutionPolicy — AMI deprecation and deletion

resource "aws_iam_role" "image_builder" {
  name = "\${var.name}-\${var.environment}-image-builder"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "image_builder_profile" {
  role       = aws_iam_role.image_builder.name
  policy_arn = "arn:aws:iam::aws:policy/EC2InstanceProfileForImageBuilder"
}

resource "aws_iam_role_policy_attachment" "image_builder_ssm" {
  role       = aws_iam_role.image_builder.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_role_policy_attachment" "image_builder_lifecycle" {
  role       = aws_iam_role.image_builder.name
  policy_arn = "arn:aws:iam::aws:policy/EC2ImageBuilderLifecycleExecutionPolicy"
}

resource "aws_iam_instance_profile" "image_builder" {
  name = "\${var.name}-\${var.environment}-image-builder"
  role = aws_iam_role.image_builder.name
}`;

export const awsPatchManagementPackerTemplate = `# packer/amazon-linux-2023.pkr.hcl
packer {
  required_plugins {
    amazon = {
      version = ">= 1.3.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

# Always start from the latest AWS AL2023 AMI so the base is never stale
data "amazon-ami" "al2023" {
  region      = "eu-west-2"
  most_recent = true
  owners      = ["amazon"]
  filters = {
    name             = "al2023-ami-*-x86_64"
    root-device-type = "ebs"
  }
}

source "amazon-ebs" "al2023" {
  region        = "eu-west-2"
  instance_type = "t3.small"
  source_ami    = data.amazon-ami.al2023.id

  # Connect via SSM Session Manager — no inbound port 22 required
  ssh_interface        = "session_manager"
  communicator         = "ssh"
  ssh_username         = "ec2-user"
  iam_instance_profile = "packer-build"

  ami_name = "patch-management-prod-\${formatdate("YYYYMMDDhhmmss", timestamp())}"
}

build {
  sources = ["source.amazon-ebs.al2023"]

  provisioner "shell" {
    inline = [
      "sudo dnf update -y --security",
      "sudo dnf clean all",
    ]
  }

  provisioner "shell" {
    inline = [
      "for pkg in telnet rsh ypbind tftp-server; do",
      "  rpm -q \\"$pkg\\" &>/dev/null && sudo dnf remove -y \\"$pkg\\"",
      "done",
      "rpm -qa --queryformat '%{NAME}|%{VERSION}|%{RELEASE}\\\\n' | sort > /tmp/rpm-manifest.txt",
    ]
  }

  post-processor "manifest" {
    output = "manifest.json"
  }
}

# ── GitHub Actions workflow (trimmed) ────────────────────────────────────────
# - name: Build AMI
#   run: packer build -var="subnet_id=\${{ vars.BUILD_SUBNET_ID }}" packer/amazon-linux-2023.pkr.hcl
#
# - name: Update Launch Template
#   run: |
#     AMI_ID=$(jq -r '.builds[-1].artifact_id' manifest.json | cut -d: -f2)
#     aws ec2 create-launch-template-version \\
#       --launch-template-id \${{ vars.LAUNCH_TEMPLATE_ID }} \\
#       --source-version '$Latest' \\
#       --launch-template-data "{\\"ImageId\\":\\"$AMI_ID\\"}"
#
# - name: Start Instance Refresh
#   run: |
#     aws autoscaling start-instance-refresh \\
#       --auto-scaling-group-name \${{ vars.ASG_NAME }} \\
#       --preferences '{"MinHealthyPercentage":90,"InstanceWarmup":300}'`;

export const awsPatchManagementCLIInstanceRefresh = `# After updating the Launch Template to point at the new AMI, trigger a
# rolling instance refresh. Old instances are replaced in batches so the
# ASG never drops below MinHealthyPercentage of capacity.
#
# MinHealthyPercentage: 90 → at most 10% of the fleet replaced at any time
# InstanceWarmup: 300      → each new instance gets 300s to pass health checks
#                            before the next batch is replaced

aws autoscaling start-instance-refresh \\
  --auto-scaling-group-name my-app-prod-asg \\
  --preferences '{
    "MinHealthyPercentage": 90,
    "InstanceWarmup": 300
  }'

# Monitor the refresh — check until Status is Successful (or Failed/Cancelled)
aws autoscaling describe-instance-refreshes \\
  --auto-scaling-group-name my-app-prod-asg \\
  --query 'InstanceRefreshes[0].{Status:Status,Progress:PercentageComplete,Reason:StatusReason}'

# If a new instance fails its health check, the refresh pauses automatically.
# Investigate, then resume or cancel:
aws autoscaling resume-processes \\
  --auto-scaling-group-name my-app-prod-asg \\
  --scaling-processes Launch`;

export const awsPatchManagementTerraformAlerting = `# Single shared SNS topic for all patch management alerts.
# Inspector Critical findings (inspector.tf) also route to this topic.

resource "aws_sns_topic" "alerts" {
  name = "\${var.name}-\${var.environment}-patch-alerts"
}

resource "aws_sns_topic_subscription" "email" {
  count     = var.sns_email != "" ? 1 : 0
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.sns_email
}

# Allow EventBridge to publish to the topic
resource "aws_sns_topic_policy" "alerts" {
  arn = aws_sns_topic.alerts.arn

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "events.amazonaws.com" }
      Action    = "sns:Publish"
      Resource  = aws_sns_topic.alerts.arn
    }]
  })
}

# EventBridge — Maintenance Window Execution Failures
resource "aws_cloudwatch_event_rule" "maintenance_window_failed" {
  name = "\${var.name}-\${var.environment}-window-failed"

  event_pattern = jsonencode({
    source      = ["aws.ssm"]
    detail-type = ["SSM Maintenance Window Execution State Change"]
    detail      = { status = ["FAILED", "TIMED_OUT"] }
  })
}

resource "aws_cloudwatch_event_target" "maintenance_window_failed" {
  rule = aws_cloudwatch_event_rule.maintenance_window_failed.name
  arn  = aws_sns_topic.alerts.arn
}

# EventBridge — Image Builder Pipeline Failures
resource "aws_cloudwatch_event_rule" "image_builder_failed" {
  count = var.enable_image_builder ? 1 : 0
  name  = "\${var.name}-\${var.environment}-image-builder-failed"

  event_pattern = jsonencode({
    source      = ["aws.imagebuilder"]
    detail-type = ["EC2 Image Builder Pipeline Execution State Change"]
    detail      = { state = { status = ["FAILED"] } }
  })
}

resource "aws_cloudwatch_event_target" "image_builder_failed" {
  count = var.enable_image_builder ? 1 : 0
  rule  = aws_cloudwatch_event_rule.image_builder_failed[0].name
  arn   = aws_sns_topic.alerts.arn
}`;

export const awsPatchManagementCLIComplianceReport = `# Audit report: all non-compliant instances with patch counts and last scan time
aws ssm list-resource-compliance-summaries \\
  --filters "Key=ComplianceType,Values=Patch,Type=EQUAL" \\
            "Key=Status,Values=NON_COMPLIANT,Type=EQUAL" \\
  | jq -r '
    ["InstanceId", "PatchGroup", "MissingCount", "FailedCount", "LastScan"],
    (
      .ResourceComplianceSummaryItems[] |
      [
        .ResourceId,
        .ExecutionSummary.ExecutionId // "unknown",
        (.ComplianceSummary.NonCompliantSummary.SeveritySummary.CriticalCount // 0 |
          tostring) + " critical",
        (.ComplianceSummary.NonCompliantSummary.SeveritySummary.HighCount // 0 |
          tostring) + " high",
        .ExecutionSummary.ExecutionTime // "unknown"
      ]
    ) | @csv
  '

# Instances with patches stuck in InstalledPendingReboot (false-compliance risk)
# These instances were patched with NoReboot — the old vulnerable code is still
# running in memory until the instance is rebooted.
aws ssm describe-instance-patch-states-for-patch-group \\
  --patch-group "my-app-prod" \\
  --query 'InstancePatchStates[?InstalledPendingRebootCount > \`0\`].{Instance:InstanceId,PendingReboot:InstalledPendingRebootCount}'`;

export const awsPatchManagementTerraformDataSync = `# Syncs SSM compliance data to a central S3 bucket in the management account.
# Enables cross-account Athena queries over patch compliance data from all accounts.
# This is a management-account resource — not part of the per-account module.

resource "aws_ssm_resource_data_sync" "to_central" {
  name = "patch-compliance-sync"

  s3_destination {
    bucket_name = "my-org-patch-compliance-\${data.aws_caller_identity.current.account_id}"
    region      = "eu-west-2"
    prefix      = "compliance/"
  }
}

# S3 bucket policy in the management account — allows SSM from all org member accounts
resource "aws_s3_bucket_policy" "patch_compliance" {
  bucket = aws_s3_bucket.patch_compliance.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid    = "AllowSSMDataSync"
      Effect = "Allow"
      Principal = {
        Service = "ssm.amazonaws.com"
      }
      Action = [
        "s3:GetBucketAcl",
        "s3:PutObject",
      ]
      Resource = [
        aws_s3_bucket.patch_compliance.arn,
        "\${aws_s3_bucket.patch_compliance.arn}/*",
      ]
      Condition = {
        StringEquals = {
          "aws:PrincipalOrgID" = data.aws_organizations_organization.current.id
        }
      }
    }]
  })
}`;

export const awsPatchManagementTerraformModuleBasic = `module "patch_management" {
  source = "../../modules/patch-management"

  name        = "my-app"
  environment = "dev"

  # Friday 22:00 UTC for dev; Saturday 01:00 for stage; Sunday 02:00 for prod
  maintenance_window_schedule = "cron(0 22 ? * FRI *)"
}`;

export const awsPatchManagementTerraformModuleComplete = `module "patch_management" {
  source = "../../modules/patch-management"

  name        = "my-app"
  environment = "prod"

  # Sunday 02:00 UTC — lowest-traffic window with rest of Sunday to monitor
  maintenance_window_schedule = "cron(0 2 ? * SUN *)"
  maintenance_window_duration = 4
  maintenance_window_cutoff   = 1

  # RebootIfNeeded avoids InstalledPendingReboot false-compliance states
  reboot_option   = "RebootIfNeeded"
  max_concurrency = "50%"
  max_errors      = "20%"

  # Soak period: null = default (7 days dev / 14 days prod based on environment)
  approve_after_days = null

  # EBS snapshot before patching — rollback path for stateful workloads
  pre_patch_snapshot = true

  # Post-patch health check — asserts HTTP 200 on each patched instance
  post_patch_health_check_url = "http://localhost/health"

  # Inspector v2 for continuous CVE detection between maintenance windows
  enable_inspector = true

  # EC2 Image Builder for weekly Golden AMI builds (Sunday 01:00 UTC)
  enable_image_builder      = true
  image_builder_base_ami_id = "ami-0example"   # latest al2023-ami-*-x86_64
  image_builder_subnet_id   = "subnet-0example"

  # All alerts (maintenance window failures, Inspector Critical, Image Builder
  # failures) route to this email via SNS
  sns_email = "ops@example.com"
}`;
