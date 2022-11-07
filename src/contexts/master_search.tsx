import React, { createContext, useEffect, useState } from "react";
import { getMaster } from "../http/master/master";
import { Document } from "flexsearch";

const MastersSearchContext = createContext({});

export interface IMasterInstrument {
  ex: string;
  ex_id: string;
  i_t: string;
  nm: string;
  des: string;
  s: string;
  nm_s: string;
  id: string;
  h_b: string;
  l_b: string;
  f_q: string;
  t_s: string;
  l_s: string;
  mul: string;
  un_id: string;
  c_e: string;
  str: string;
  opt: string;
  un_idx: string;
  d_nm: string;
  isin: string;
  nmr: string;
  dnr: string;
  descriptionTwo: string;
  nv: string;
  bv: string;
  o: string;
  c: string;
  h: string;
  l: string;
  ex_f: string;
  c_nm: string;
}

const MasterSearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!search) {
        const _search = new Document({
          charset: "latin",
          lang: "en",
          id: "ex_id",
          index: [
            {
              field: "d_nm",
              tokenize: "full",
            },
          ],
          store: true,
        });
        setSearch(_search);
      } else {
        const response = await getMaster(["NSECM", "BSECM", "NSECD", "NSEFO"]);

        response.data.map(({ ex_id, d_nm, ex }) => {
          search.add({
            ex_id,
            d_nm,
            ex,
          });
        });
      }
    })();
  }, [search]);

  return (
    <MastersSearchContext.Provider value={{ search }}>
      {children}
    </MastersSearchContext.Provider>
  );
};

export { MastersSearchContext, MasterSearchContextProvider };
