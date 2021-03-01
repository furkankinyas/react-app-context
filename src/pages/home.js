import React, { useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { createApi } from "unsplash-js";
import { GlobalContext } from "../context/context";

const unsplash = new createApi({
  accessKey: "eeb89ad66933ae094352dcee4a037cc27ba514d19da2a3030a7eb15216d5d209",
});

export default function HomeNew() {
  const [isLoading, setIsLoading] = useState(true);
  const [ajaxPage, setAjaxPage] = useState(1);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { data } = useContext(GlobalContext);

  const handleFieldChange = () => {
    setList([]);
    setAjaxPage(1);
    if (data.searchText === "") {
      setSearch(false);
      setHasMore(true);
    } else {
      setSearch(true);
      if (data.searchText.length > 1) {
        fetchMoreData();
      }
    }
  };

  const fetchMoreData = () => {
    if (search === true) {
      unsplash.search
        .getPhotos({
          query: data.searchText,
          page: ajaxPage,
          perPage: 12,
        })
        .then((data) => {
          if (data.response.results.length === 0) {
            setHasMore(false);
            return;
          }
          setList([...list, ...data.response.results]);
          setIsLoading(false);
          setAjaxPage(ajaxPage + 1);
        });
    } else {
      unsplash.photos
        .list({ page: ajaxPage, perPage: 12, orderBy: "latest" })
        .then((data) => {
          if (data.response.results.length === 0) {
            setHasMore(false);
            return;
          }
          setList([...list, ...data.response.results]);
          setIsLoading(false);
          setAjaxPage(ajaxPage + 1);
        });
    }
  };

  useEffect(() => {
    handleFieldChange(); // eslint-disable-next-line
  }, [data.searchText]);

  useEffect(() => {
    fetchMoreData(); // eslint-disable-next-line
  }, [search]);

  return (
    <>
      {!isLoading && (
        <div className="container">
          <InfiniteScroll
            className="row margin-bottom"
            dataLength={list.length}
            next={() => fetchMoreData()}
            hasMore={hasMore}
            endMessage={
              <div className="font-size-14 text-center padding-lg font-weight-7 width-full">
                Şimdilik bu kadar başka birşeyler aramaya ne dersin?
              </div>
            }
            loader={
              <div className="font-size-14 text-center padding-lg font-weight-7 width-full">
                Yükleniyor...
              </div>
            }
          >
            {list.length > 0 &&
              list.map((item, index) => (
                <div className="col-4" key={index}>
                  <div className="image-wrapper margin-bottom-md">
                    <img
                      alt={item.user.name}
                      className="responsive-image"
                      src={item.urls.small}
                    />
                  </div>
                  <h2 className="font-size-14 font-weight-7">
                    {item.user.name}
                  </h2>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
}
