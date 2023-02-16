import { User, Visual } from "../models/init-models";

async function isPresent(user_id: string): Promise<boolean> {
  return !!(await User.findByPk(user_id));
}

export async function login(user_id: string, user_pw: string): Promise<Visual[] | null> {
  console.log(user_id, user_pw);
  const user = await User.findByPk(user_id, { include: [{ model: Visual, as: "visuals" }] });
  console.log(user);
  if (user?.pw === user_pw) return user.visuals;
  else return null;
}

export async function create(user_id: string, user_pw: string): Promise<boolean> {
  if (await isPresent(user_id)) return false;
  if (await User.create({ id: user_id, pw: user_pw })) return true;
  return false;
}
