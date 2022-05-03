import { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import HeroFilters from "../Components/HeroFilters";
import HeroTable from "../Components/Table/HeroTable";
import { base, heroData } from "../Logic/Query";
import RequestContext from "../Context/Context";
import { Button, Dialog } from "@mui/material";
import { RestaurantMenuTwoTone } from "@mui/icons-material";
import HeroDetails from "../Components/Modal/HeroDetails";
export default function Home() {
  const filtersRef = useRef(null);
  const [filtersHidden, setFiltersHidden] = useState(false);
  const [first, setFirst] = useState(100);
  const [skip, setSkip] = useState(0);
  const [heroDetails, setHeroDetails] = useState(null);
  const updateHeroes = useRef();
  const lastRequest = useRef();
  const toggleFilters = (e) => {
    if (typeof window) {
      filtersRef.current.classList.toggle("collapse");
      setFiltersHidden((hidden) => !hidden);
    }
  };
  const requestContext = useContext(RequestContext);
  const testRequest = async () => {
    return fetch(base, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        query: `{heroes(first:${first},skip:${skip},${
          requestContext.query.query.length > 0 ? "where:{" : ""
        }${requestContext.query.query}${
          requestContext.query.query.length > 0 ? "}" : ""
        }, orderBy:salePrice, orderDirection:asc){${heroData}}}`,
      }),
    });
  };
  const result = useQuery(
    ["request", requestContext.query.query + first + skip],
    async () => {
      return {
        q: requestContext.query.query,
        res: await (await testRequest()).json(),
      };
    },
    {
      onSuccess: async (result) => {
        console.log(result);
        let data = result.res.data;
        if (data == null) {
          return;
        }

        if (result.q != requestContext.query.query) {
          return;
        }
        if (first == data.heroes.length) {
          setSkip((s) => s + first);
          setFirst((f) => 1000);
        }
        updateHeroes.current(data.heroes, false);
      },
    }
  );
  useEffect(() => {
    if (lastRequest.current == requestContext.query.query) {
      console.log("Didn't clear search");
      return;
    }
    console.log("Clear Search");
    lastRequest.current = requestContext.query.query;
    updateHeroes.current([], true);
    setSkip((s) => 0);
    setFirst((f) => 100);
  });
  const clickedHero = (hero) => {
    setHeroDetails(h => hero);
  }
  return (
    <>
      <div>
        <div className="text-center mb-3">
          <Button
            variant="contained"
            color={filtersHidden ? "primary" : "secondary"}
            onClick={toggleFilters}
          >
            Filters
          </Button>
        </div>
        <div>
          <HeroFilters
            includeSalePrice={true}
            onSaleDefault={true}
            ref={filtersRef}
          />
        </div>
      </div>
      <HeroTable
        isLoading={result.isLoading}
        update={(updateFunc) => (updateHeroes.current = updateFunc)}
        clickedHero={clickedHero}
      />
      {
        heroDetails !== null &&
        <HeroDetails hero={heroDetails} clear={() => setHeroDetails(null)} />
      }
    </>
  );
}
