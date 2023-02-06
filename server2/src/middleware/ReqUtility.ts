import { Combo, Req } from "../models/init-models";

export async function getRecentReq(req_id: number, start_year?: number): Promise<Req | null> {
  return await Req.findOne({
    where: { id: req_id, start_year: await getReqYear(req_id, start_year) },
    include: { model: Combo, as: "combo" },
  });
}

async function getReqYear(req_id: number, start_year?: number): Promise<number> {
  const req_year = start_year
    ? Math.max(
        ...(await Req.findAll({ where: { id: req_id } }))
          .map((aReq) => aReq.start_year)
          .filter((year) => year <= start_year)
      )
    : Math.max(...(await Req.findAll({ where: { id: req_id } })).map((aReq) => aReq.start_year));
  return req_year;
}
