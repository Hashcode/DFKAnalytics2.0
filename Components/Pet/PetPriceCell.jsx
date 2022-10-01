import React from "react";
import { FixSalePrice } from "../../Logic/HeroBase";
import Image from "next/image";
import Jewel from "../../public/Jewel.png";
import Crystal from "../../public/Crystal.png";
import { Grid, Tooltip } from "@mui/material";

export default function PetPriceCell({ children }) {
  return (
    <>
      {children.salePrice ? (
        <Tooltip
          placement="right"
          title={
            children.currentRealm == "SER1"
              ? `This pet is being sold in Serendale for Jewel.`
              : `This pet is being sold in Crystalvale for Crystal.`
          }
        >
          <Grid container justifyContent={"space-between"}>
            <Grid item sx={{ alignSelf: "center" }}>
              {FixSalePrice(children.salePrice)}
            </Grid>
            <Grid item sx={{ marginTop: "4px" }}>
              {children.currentRealm == "SER1" ? (
                <Image src={Jewel} alt="Jewel" height="24px" width="24px" />
              ) : (
                <Image src={Crystal} alt="Crystal" height="24px" width="24px" />
              )}
            </Grid>
          </Grid>
        </Tooltip>
      ) : (
        ""
      )}
    </>
  );
}
