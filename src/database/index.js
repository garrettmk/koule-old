import RxDB from 'rxdb';
import IndexedDBAdapter from 'pouchdb-adapter-idb';
import MemoryAdapter from 'pouchdb-adapter-memory';

RxDB.plugin(MemoryAdapter);
RxDB.plugin(IndexedDBAdapter);

const collections = [
  {
    name: 'groups',
    schema: {
      title: 'Task group schema',
      description: 'Describes a task group',
      version: 0,
      type: 'object',
      properties: {
        id: {
          type: 'string',
          primary: true,
        },
        title: {
          type: 'string',
          minLength: 1,
        },
        color: {
          type: 'string'
        }
      },
      required: ['id', 'title']
    }
  },
  {
    name: 'tasks',
    schema: {
      title: 'Task schema',
      description: 'Describes a task',
      version: 0,
      type: 'object',
      properties: {
        id: {
          type: 'string',
          primary: true,
        },
        title: {
          type: 'string',
          minLength: 1,
        },
        start: {
          type: 'string',
          format: 'date-time',
        }
      },
      required: ['id', 'title', 'start']
    }
  }
];

let dbPromise = null;
export async function createDb() {
  console.log('Creating database...');

  const db = await RxDB.create({
    name: 'kouledb',
    adapter: 'memory'
  });

  window.db = db;

  await Promise.all(
    collections.map(
      col => db.collection(col)
    )
  );

  return db;
}

export async function getDatabase() {
  if (!dbPromise)
    dbPromise = createDb();

  return dbPromise;
}

export async function addTask(task) {
  const taskDoc = {
    id: String(task.id),
    title: task.title,
    start: task.start.toISOString(),
  };

  const db = await getDatabase();
  const doc = await db.tasks.insert(taskDoc);
}

export async function logTasks() {
  const db = await getDatabase();

  db.tasks.find().$.subscribe(tasks => {
    console.log('tasks ', tasks);
  })
}