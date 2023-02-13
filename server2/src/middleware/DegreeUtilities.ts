import { Degree, Req } from "../models/init-models";

export async function getDegreeReq(degree_id: number): Promise<Degree | null> {
  return await Degree.findOne({
    where: { id: degree_id },
    include: { model: Req, as: "req" },
  });
}
