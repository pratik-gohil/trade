import { Launch, ShareOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { getStockNews } from "../../http/news/stock_news_1";

interface INews {
  NSEcode: string;
  BSEcode: string;
  ISIN: string;
  stockName: string;
  stockId: number;
  pageType: string;
  userType: number;
  insight: Insight;
  postType: string;
  postTypeNumber: number;
  related?: any;
  pubDate: string;
  title: string;
  description: string;
  descriptionHTML: string;
  authorId: number;
  isPremium: boolean;
  url?: string;
  source: string;
  videoUrl: string;
  pdfUrl?: any;
  imageUrl?: string | null;
}

interface Insight {
  title?: string;
}

function News({ instrument }) {
  const [newsList, setNewsList] = useState<INews[]>([]);
  const fetchNews = async ({ symbol }) => {
    const response = await getStockNews({ symbol });
    return response;
  };
  useEffect(() => {
    fetchNews({ symbol: instrument?.DisplayName }).then((res) =>
      setNewsList(res.body.newsList)
    );
  }, []);

  return (
    <div className="p-5 border rounded-md">
      <h1 className="text-primary text-2xl font-bold">News</h1>
      <div className="flex flex-col h-fit overflow-y-auto max-h-[calc(100vh-4rem-40px-45px-2.5rem-27px-3rem)] overflow-hidden">
        {newsList.map((n, i) => (
          <div key={i} className="flex py-5 border-b">
            {n.imageUrl && (
              <img
                src={n.imageUrl || ""}
                width="130px"
                height="100px"
                className="w-[130px] h-[100px] rounded-[5px]"
              />
            )}
            <div className="flex flex-col gap-4 px-4 w-full">
              <h1 className="text-lg text-primary font-medium">{n.title}</h1>
              <p className="text-xs text-secondary truncate-multiline">
                {n.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center justify-center">
                  <p className="text-xs text-secondary">
                    <span className="text-blue font-medium">{n.source}</span> |{" "}
                    <span className="">
                      {
                        (new Date(n.pubDate).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }),
                        new Date(n.pubDate).toLocaleTimeString("en-IN"))
                      }
                    </span>
                  </p>
                  {n.insight.title && (
                    <p className="text-xxxs py-2 px-3 bg-[#f2f2f2] rounded-md">
                      {n.insight.title}
                    </p>
                  )}
                </div>
                <div className="flex gap-2.5 justify-end">
                  <a target="_blank" href={n.url} className="m-0 p-0">
                    <Launch sx={{ fontSize: "12px" }} className="text-blue" />
                  </a>
                  <a target="_blank" href={n.url} className="m-0 p-0">
                    <ShareOutlined
                      sx={{ fontSize: "12px" }}
                      className="text-blue"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
