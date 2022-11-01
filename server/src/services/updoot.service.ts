import { Database } from '../config/database';
import { Updoot } from '../entities/updoot.entity';

const vote = async (userId: string, postId: string, value: number) => {
  const updoot = new Updoot();

  const isUpdoot = value !== -1;

  const realValue = isUpdoot ? 1 : -1;

  // updoot.userId = userId;
  // updoot.postId = postId;
  // updoot.value = realValue;

  // await Database.manager.save(updoot);

  await Database.manager.query(`
  BEGIN TRANSACTION;
  INSERT INTO updoot ("userId", "postId", "value") VALUES ('${userId}', '${postId}', ${value});
  UPDATE post
  SET points = points + ${realValue}
  WHERE id = '${postId}';
  COMMIT;
  `);

  return true;
};

export const updootBackend = { vote };
