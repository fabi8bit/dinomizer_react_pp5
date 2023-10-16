import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import styles from "../../styles/ProjectAsset.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axios.Defaults";
import Placeholder from "../../components/Placeholder";
// import Project from "./Project";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utility/utility";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Asset from "./Asset";


function AssetsPage({ myContribute }) {
    const currentUser = useCurrentUser();
    const [assets, setAssets] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

    const is_contributor = assets?.results.filter((asset) => asset.is_owner).length;

    


    useEffect(() => {
        const fetchAssets = async () => {
        try {
            const { data } = await axiosReq.get(`/assets/?search=${query}`);
            setAssets(data);
            setHasLoaded(true);
        } catch (err) {
            console.log(err);
        }
        };

        
        
        

    setHasLoaded(false);
    fetchAssets();
  }, [pathname, query]);

  return (
    <Row>
      <Col
        className={styles.Section2}
        lg={6}
        sm={12}
      >
        <Container>
          <Row>
            <Col>
              <Form
                className={styles.SearchBar}
                onSubmit={(event) => event.preventDefault()}
              >
                <FormControl
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="text"
                  placeholder="Search assets"
                />
              </Form>
            </Col>
          </Row>
        </Container>
        {hasLoaded ? (
          <>
            {assets.results.length ? (

              <InfiniteScroll
                children={
                    is_contributor ? (
                    assets.results
                      .filter((asset) => asset.is_owner)
                      .map((asset) => (
                        <Asset
                          key={asset.id}
                          {...asset}
                          setAssets={setAssets}
                          smImg
                        />
                      ))
                  ) : (
                    myContribute ? (
                        <p>You are not contributing to any project</p>
                    ) : (
                        assets.results.map((asset) => (
                            <Asset
                              key={asset.id}
                              {...asset}
                              setAssets={setAssets}
                            />
                          ))
                    )
                    
                  )
                }
                dataLength={assets.results.length}
                loader={<Placeholder spinner/>}
                hasMore={!!assets.next}
                next={() => fetchMoreData(assets,setAssets)}
              />
              
            ) : (

              <Container>
                <Placeholder
                  src={""}
                  message="No results"
                />
              </Container>
            )}
          </>

        ) : (

          <Container>
            <Placeholder spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default AssetsPage;
