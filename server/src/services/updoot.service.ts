import { Database } from '../config/database';
import { Updoot } from '../entities/updoot.entity';

const vote = async (userId: string, postId: string, value: number) => {
  const updootAlreadyExist = await Updoot.findOne({ where: { postId, userId } });

  console.log('updoot====', updootAlreadyExist);

  const isUpdoot = value !== -1;

  const realValue = isUpdoot ? 1 : -1;

  // user has already voted and changing from current vote

  if (updootAlreadyExist && updootAlreadyExist.value !== realValue) {
    await Database.transaction(async (tm) => {
      await tm.query(`
      UPDATE updoot
      SET value = ${realValue}
      WHERE "postId" = '${postId}' AND "userId" = '${userId}'
      `);
      // vote 1
      // post point 1
      // if we add -1 then it will be 0 we dont want to be 0, we want to be -1
      await tm.query(`
        UPDATE post
        SET points = points + ${2 * realValue}
        WHERE id = '${postId}'
      `);
    });
  } else if (!updootAlreadyExist) {
    Database.manager.transaction(async (tm) => {
      await tm.query(
        `
        INSERT INTO updoot ("userId", "postId", value) VALUES ($1, $2, $3)
      `,
        [userId, postId, value]
      );

      await tm.query(`
    UPDATE post
    SET points = points + ${realValue}
    WHERE id = '${postId}';
  `);
    });
  }

  return true;
};

export const updootBackend = { vote };
