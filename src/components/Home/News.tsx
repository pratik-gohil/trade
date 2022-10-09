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
    console.log(response);
    return response;
  };
  useEffect(() => {
    // const newsResponse = fetchNews({ symbol: instrument?.DisplayName });
    const newsResponse = {
      head: {
        isNextPage: true,
        status: "0",
        thisPageNumber: 10,
        statusDescription: "Success",
        qsTime: 1665094230.0,
        timestamp: 1665094230.0,
        responseCode: "Trendlyne",
      },
      body: {
        newsList: [
          {
            NSEcode: "RELIANCE",
            BSEcode: "500325",
            ISIN: "INE002A01018",
            stockName: "Reliance Industries Ltd.",
            stockId: 1127,
            pageType: "Equity",
            userType: 32,
            insight: {
              title:
                "Number of FII/FPI investors increased from 2239 to 2304 in Jun 2022 qtr.",
            },
            postType: "News",
            postTypeNumber: 1,
            related: null,
            pubDate: "2022-08-22T13:34:17+00:00",
            title: "Broker's Call: Reliance Ind (Add)",
            description: "ICICI Securities",
            descriptionHTML: "ICICI Securities",
            authorId: 1127,
            isPremium: false,
            url: "https://www.thehindubusinessline.com/markets/brokers-call-reliance-ind-add/article65797864.ece",
            source: "Business Line",
            videoUrl: "",
            pdfUrl: null,
            imageUrl: null,
          },
          {
            NSEcode: "RELIANCE",
            BSEcode: "500325",
            ISIN: "INE002A01018",
            stockName: "Reliance Industries Ltd.",
            stockId: 1127,
            pageType: "Equity",
            userType: 32,
            insight: {
              title:
                "Reliance Industries Ltd. is trading below all available SMAs",
            },
            postType: "News",
            postTypeNumber: 1,
            related: null,
            pubDate: "2022-08-21T05:01:21+00:00",
            title:
              "Market Valuation of Top 10 Firms Falls Over Rs 30,000 Crore",
            description:
              "Five of the top-10 valued firms together lost Rs 30,737.51 crore in market valuation last week, with Reliance Industries Limited taking the biggest hit.",
            descriptionHTML:
              "Five of the top-10 valued firms together lost Rs 30,737.51 crore in market valuation last week, with Reliance Industries Limited taking the biggest hit.",
            authorId: 1127,
            isPremium: false,
            url: "https://www.ndtv.com/business/market-valuation-of-top-10-firms-falls-over-rs-30-000-crore-3272401",
            source: "NDTV Profit",
            videoUrl: "",
            pdfUrl: null,
            imageUrl:
              "https://c.ndtvimg.com/2022-07/25kmg3po_reliance_625x300_25_July_22.jpg",
          },
          {
            NSEcode: "RELIANCE",
            BSEcode: "500325",
            ISIN: "INE002A01018",
            stockName: "Reliance Industries Ltd.",
            stockId: 1127,
            pageType: "Equity",
            userType: 32,
            insight: {
              title:
                "Reliance Industries .. has an average target of 2894.70 from 11 brokers.",
            },
            postType: "Corp. Note",
            postTypeNumber: 2,
            related: null,
            pubDate: "2022-08-19T17:52:07+00:00",
            title:
              "RELIANCE INDUSTRIES LTD. - 500325 - Compliances-Reg. 39 (3) - Details of Loss of Certificate / Duplicate Certificate",
            description:
              "Pursuant to Regulation 39(3) of the Securities and Exchange Board of India (Listing Obligations and Disclosure Requirements) Regulations, 2015 and in terms of SEBI Circular No. SEBI / HO / MIRSD / MIRSD_RTAMB / P / CIR / 2022 / 8 dated January 25, 2022, we enclose the details of 'Letter(s) of Confirmation' issued by the Company to its shareholders, in lieu of share certificate(s) reported as lost by them.",
            descriptionHTML:
              "Pursuant to Regulation 39(3) of the Securities and Exchange Board of India (Listing Obligations and Disclosure Requirements) Regulations, 2015 and in terms of SEBI Circular No. SEBI / HO / MIRSD / MIRSD_RTAMB / P / CIR / 2022 / 8 dated January 25, 2022, we enclose the details of 'Letter(s) of Confirmation' issued by the Company to its shareholders, in lieu of share certificate(s) reported as lost by them.",
            authorId: 1127,
            isPremium: false,
            url: "https://www.bseindia.com/xml-data/corpfiling/AttachHis/31b2d883-8989-4f42-bc52-990b02d1a452.pdf",
            source: "BSE India",
            videoUrl: "",
            pdfUrl:
              "https://www.bseindia.com/xml-data/corpfiling/AttachHis/31b2d883-8989-4f42-bc52-990b02d1a452.pdf",
            imageUrl: null,
          },
          {
            NSEcode: "RELIANCE",
            BSEcode: "500325",
            ISIN: "INE002A01018",
            stockName: "Reliance Industries Ltd.",
            stockId: 1127,
            pageType: "Equity",
            userType: 32,
            insight: {},
            postType: "Corp. Note",
            postTypeNumber: 2,
            related: null,
            pubDate: "2022-08-19T15:21:50+00:00",
            title:
              "RELIANCE INDUSTRIES LTD. - 500325 - Compliances-Reg. 39 (3) - Details of Loss of Certificate / Duplicate Certificate",
            description:
              "Pursuant to Regulation 39(3) of the Securities and Exchange Board of India (Listing Obligations and Disclosure Requirements) Regulations, 2015, we enclose the information regarding loss of share certificate(s) received from the shareholder(s) of the Company on August 18, 2022 and August 19, 2022 aggregating to 4,048 (Four Thousand Forty Eight) shares. As required under SEBI Circular No. SEBI / HO / MIRSD / MIRSD_ RTAMB / P / CIR / 2022 / 8 dated January 25, 2022, the Company shall issue 'Letter of Confirmation' to the shareholders after compliance of required formalities.",
            descriptionHTML:
              "Pursuant to Regulation 39(3) of the Securities and Exchange Board of India (Listing Obligations and Disclosure Requirements) Regulations, 2015, we enclose the information regarding loss of share certificate(s) received from the shareholder(s) of the Company on August 18, 2022 and August 19, 2022 aggregating to 4,048 (Four Thousand Forty Eight) shares. As required under SEBI Circular No. SEBI / HO / MIRSD / MIRSD_ RTAMB / P / CIR / 2022 / 8 dated January 25, 2022, the Company shall issue 'Letter of Confirmation' to the shareholders after compliance of required formalities.",
            authorId: 1127,
            isPremium: false,
            url: "https://www.bseindia.com/xml-data/corpfiling/AttachHis/47853a02-7ece-4320-96b2-4c94dbb5a78b.pdf",
            source: "BSE India",
            videoUrl: "",
            pdfUrl:
              "https://www.bseindia.com/xml-data/corpfiling/AttachHis/47853a02-7ece-4320-96b2-4c94dbb5a78b.pdf",
            imageUrl: null,
          },
          {
            NSEcode: "RELIANCE",
            BSEcode: "500325",
            ISIN: "INE002A01018",
            stockName: "Reliance Industries Ltd.",
            stockId: 1127,
            pageType: "Equity",
            userType: 32,
            insight: {},
            postType: "News",
            postTypeNumber: 1,
            related: [
              {
                NSEcode: "RELIANCE",
                BSEcode: "500325",
                ISIN: "INE002A01018",
                stockName: "Reliance Industries Ltd.",
                stockId: 1127,
                pageType: "Equity",
                userType: 32,
                insight: {},
                postType: "News",
                postTypeNumber: 1,
                related: null,
                pubDate: "2022-08-18T03:56:25+00:00",
                title:
                  "Reliance Industries shares trade ex-dividend today. Key things to know",
                description:
                  "RIL fixed August 19 as the record date for determining the members eligible to receive a dividend for the financial year FY22",
                descriptionHTML:
                  "RIL fixed August 19 as the record date for determining the members eligible to receive a dividend for the financial year FY22",
                authorId: 1127,
                isPremium: false,
                url: "https://www.livemint.com/market/stock-market-news/reliance-industries-ril-shares-trade-ex-dividend-what-investors-need-to-know-11660793302434.html",
                source: "livemint",
                videoUrl: "",
                pdfUrl: null,
                imageUrl:
                  "https://images.livemint.com/img/2022/08/18/600x338/Reliance_industries_1660793404682_1660793404885_1660793404885.JPG",
              },
            ],
            pubDate: "2022-08-18T08:14:00+00:00",
            title:
              "Lenders agree to RNTL-Reliance Industries' takeover deal: Report",
            description:
              "Two years after the deal was approved by the NCLT, banks led by the State Bank of India (SBI) have agreed to issue a no objection certificate (NOC) to Mukesh Ambani-owned Reliance Industries",
            descriptionHTML:
              "Two years after the deal was approved by the NCLT, banks led by the State Bank of India (SBI) have agreed to issue a no objection certificate (NOC) to Mukesh Ambani-owned Reliance Industries",
            authorId: 1127,
            isPremium: false,
            url: "https://www.business-standard.com/article/companies/lenders-agree-to-rntl-reliance-industries-takeover-deal-report-122081800438_1.html",
            source: "Business Standard",
            videoUrl: "",
            pdfUrl: null,
            imageUrl:
              "https://bsmedia.business-standard.com/_media/bs/img/article/2020-03/16/full/1584300408-478.jpg",
          },
          {
            NSEcode: "RELIANCE",
            BSEcode: "500325",
            ISIN: "INE002A01018",
            stockName: "Reliance Industries Ltd.",
            stockId: 1127,
            pageType: "Equity",
            userType: 32,
            insight: {},
            postType: "Corp. Note",
            postTypeNumber: 2,
            related: null,
            pubDate: "2022-08-17T14:00:24+00:00",
            title:
              "RELIANCE INDUSTRIES LTD. - 500325 - Compliances-Reg. 39 (3) - Details of Loss of Certificate / Duplicate Certificate",
            description:
              "Pursuant to Regulation 39(3) of the Securities and Exchange Board of India (Listing Obligations and Disclosure Requirements) Regulations, 2015, we enclose the information regarding loss of share certificate(s) for 2,807 (Two Thousand Eight Hundred Seven) shares received from the shareholder(s) of the Company on August 16, 2022. As required under SEBI Circular No. SEBI / HO / MIRSD / MIRSD_RTAMB / P /CIR /2022/8 dated January 25, 2022, the Company shall issue 'Letter of Confirmation' to the shareholders after compliance of required formalities.",
            descriptionHTML:
              "Pursuant to Regulation 39(3) of the Securities and Exchange Board of India (Listing Obligations and Disclosure Requirements) Regulations, 2015, we enclose the information regarding loss of share certificate(s) for 2,807 (Two Thousand Eight Hundred Seven) shares received from the shareholder(s) of the Company on August 16, 2022. As required under SEBI Circular No. SEBI / HO / MIRSD / MIRSD_RTAMB / P /CIR /2022/8 dated January 25, 2022, the Company shall issue 'Letter of Confirmation' to the shareholders after compliance of required formalities.",
            authorId: 1127,
            isPremium: false,
            url: "https://www.bseindia.com/xml-data/corpfiling/AttachHis/62aea7d5-1d97-47d6-ad2e-297a2452b3ca.pdf",
            source: "BSE India",
            videoUrl: "",
            pdfUrl:
              "https://www.bseindia.com/xml-data/corpfiling/AttachHis/62aea7d5-1d97-47d6-ad2e-297a2452b3ca.pdf",
            imageUrl: null,
          },
          {
            NSEcode: "RELIANCE",
            BSEcode: "500325",
            ISIN: "INE002A01018",
            stockName: "Reliance Industries Ltd.",
            stockId: 1127,
            pageType: "Equity",
            userType: 32,
            insight: {},
            postType: "News",
            postTypeNumber: 1,
            related: null,
            pubDate: "2022-08-17T11:50:00+00:00",
            title:
              "Centre grants Z category VIP security cover to industrialist Gautam Adani",
            description:
              "Billionaire industrialist and Adani Group Chairman Gautam Adani has been accorded a 'Z' category VIP security cover of CRPF commandos by the central government, official sources said Wednesday. They said the all-India cover will be on a \"payment basis\" and is expected to cost about Rs 15-20 lakh per month. The security cover under the central list was accorded to Adani, 60, on the basis of a threat perception report prepared by central security agencies, they said. The Union Home Ministry has asked the Central Reserve Police Force (CRPF) VIP security wing to take over the job and its squad is now with the protectee, they said. RIL Chairman Mukesh Ambani was given a 'Z+' category cover of CRPF commandos by the Union government in 2013, followed by a lower category cover to his wife Neeta Ambani some years later.",
            descriptionHTML:
              "Billionaire industrialist and Adani Group Chairman Gautam Adani has been accorded a 'Z' category VIP security cover of CRPF commandos by the central government, official sources said Wednesday. They said the all-India cover will be on a \"payment basis\" and is expected to cost about Rs 15-20 lakh per month. The security cover under the central list was accorded to Adani, 60, on the basis of a threat perception report prepared by central security agencies, they said. The Union Home Ministry has asked the Central Reserve Police Force (CRPF) VIP security wing to take over the job and its squad is now with the protectee, they said. RIL Chairman Mukesh Ambani was given a 'Z+' category cover of CRPF commandos by the Union government in 2013, followed by a lower category cover to his wife Neeta Ambani some years later.",
            authorId: 1127,
            isPremium: false,
            url: "https://www.business-standard.com/article/current-affairs/centre-grants-z-category-vip-security-cover-to-industrialist-gautam-adani-122081700875_1.html",
            source: "Business Standard",
            videoUrl: "",
            pdfUrl: null,
            imageUrl:
              "https://bsmedia.business-standard.com/_media/bs/img/article/2021-06/17/full/1623928565-2164.jpg",
          },
          {
            NSEcode: "RELIANCE",
            BSEcode: "500325",
            ISIN: "INE002A01018",
            stockName: "Reliance Industries Ltd.",
            stockId: 1127,
            pageType: "Equity",
            userType: 32,
            insight: {},
            postType: "Corp. Note",
            postTypeNumber: 2,
            related: null,
            pubDate: "2022-08-16T15:23:13+00:00",
            title:
              "RELIANCE INDUSTRIES LTD. - 500325 - Compliances-Reg. 39 (3) - Details of Loss of Certificate / Duplicate Certificate",
            description:
              "Pursuant to Regulation 39(3) of the Securities and Exchange Board of India (Listing Obligations and Disclosure Requirements) Regulations, 2015 and in terms of SEBI Circular No. SEBI / HO / MIRSD / MIRSD_RTAMB / P / CIR / 2022 / 8 dated January 25, 2022, we enclose the details of 'Letter(s) of Confirmation' issued by the Company to its shareholders, in lieu of share certificate(s) reported as lost by them. Please take the same on record.",
            descriptionHTML:
              "Pursuant to Regulation 39(3) of the Securities and Exchange Board of India (Listing Obligations and Disclosure Requirements) Regulations, 2015 and in terms of SEBI Circular No. SEBI / HO / MIRSD / MIRSD_RTAMB / P / CIR / 2022 / 8 dated January 25, 2022, we enclose the details of 'Letter(s) of Confirmation' issued by the Company to its shareholders, in lieu of share certificate(s) reported as lost by them. Please take the same on record.",
            authorId: 1127,
            isPremium: false,
            url: "https://www.bseindia.com/xml-data/corpfiling/AttachHis/7a76b23d-cf53-4899-b854-3282abb85b89.pdf",
            source: "BSE India",
            videoUrl: "",
            pdfUrl:
              "https://www.bseindia.com/xml-data/corpfiling/AttachHis/7a76b23d-cf53-4899-b854-3282abb85b89.pdf",
            imageUrl: null,
          },
          {
            NSEcode: "RELIANCE",
            BSEcode: "500325",
            ISIN: "INE002A01018",
            stockName: "Reliance Industries Ltd.",
            stockId: 1127,
            pageType: "Equity",
            userType: 32,
            insight: {},
            postType: "News",
            postTypeNumber: 1,
            related: [
              {
                NSEcode: "RELIANCE",
                BSEcode: "500325",
                ISIN: "INE002A01018",
                stockName: "Reliance Industries Ltd.",
                stockId: 1127,
                pageType: "Equity",
                userType: 32,
                insight: {},
                postType: "News",
                postTypeNumber: 1,
                related: null,
                pubDate: "2022-08-16T04:51:25+00:00",
                title:
                  "South Mumbai jeweller threatened Mukesh Ambani, family; called 8 times in 2 hrs",
                description:
                  "The Ambani family received eight calls in a span of 2 hours from Bhowmik under the false identity, according to police.",
                descriptionHTML:
                  "The Ambani family received eight calls in a span of 2 hours from Bhowmik under the false identity, according to police.",
                authorId: 1127,
                isPremium: false,
                url: "https://www.businesstoday.in/latest/economy/story/south-mumbai-jeweller-threatened-mukesh-ambani-family-called-8-times-in-2-hrs-344746-2022-08-16?utm_source=rssfeed",
                source: "Business Today",
                videoUrl: "",
                pdfUrl: null,
                imageUrl:
                  "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202208/ambanis-sixteen_nine.png",
              },
              {
                NSEcode: "RELIANCE",
                BSEcode: "500325",
                ISIN: "INE002A01018",
                stockName: "Reliance Industries Ltd.",
                stockId: 1127,
                pageType: "Equity",
                userType: 32,
                insight: {},
                postType: "News",
                postTypeNumber: 1,
                related: null,
                pubDate: "2022-08-15T09:08:00+00:00",
                title:
                  "Fresh threats to RIL's Mukesh Ambani and his family, Mumbai cops detain man",
                description:
                  "According to an official, the threats were made in several phone calls received at the Sir H N Reliance Foundation Hospital in south Mumbai on Monday",
                descriptionHTML:
                  "According to an official, the threats were made in several phone calls received at the Sir H N Reliance Foundation Hospital in south Mumbai on Monday",
                authorId: 1127,
                isPremium: false,
                url: "https://www.business-standard.com/article/current-affairs/mukesh-ambani-and-family-receive-fresh-threats-mumbai-cops-probing-122081500439_1.html",
                source: "Business Standard",
                videoUrl: "",
                pdfUrl: null,
                imageUrl:
                  "https://bsmedia.business-standard.com/_media/bs/img/article/2022-03/16/full/1647394992-3654.jpg",
              },
              {
                NSEcode: "RELIANCE",
                BSEcode: "500325",
                ISIN: "INE002A01018",
                stockName: "Reliance Industries Ltd.",
                stockId: 1127,
                pageType: "Equity",
                userType: 32,
                insight: {},
                postType: "News",
                postTypeNumber: 1,
                related: null,
                pubDate: "2022-08-15T07:56:28+00:00",
                title:
                  "Complaint filed against caller threatening RIL's Mukesh Ambani, family",
                description:
                  "The call was received on the display number of Reliance Foundation's Harkisandas hospital. The caller called more than three times, as per news agency ANI.",
                descriptionHTML:
                  "The call was received on the display number of Reliance Foundation's Harkisandas hospital. The caller called more than three times, as per news agency ANI.",
                authorId: 1127,
                isPremium: false,
                url: "https://www.businesstoday.in/latest/corporate/story/complaint-filed-against-caller-threatening-rils-mukesh-ambani-family-344677-2022-08-15?utm_source=rssfeed",
                source: "Business Today",
                videoUrl: "",
                pdfUrl: null,
                imageUrl:
                  "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202208/mukesh-ambani_0-sixteen_nine.jpg",
              },
              {
                NSEcode: "RELIANCE",
                BSEcode: "500325",
                ISIN: "INE002A01018",
                stockName: "Reliance Industries Ltd.",
                stockId: 1127,
                pageType: "Equity",
                userType: 32,
                insight: {},
                postType: "News",
                postTypeNumber: 1,
                related: null,
                pubDate: "2022-08-14T19:39:00+00:00",
                title:
                  "RIL, Nayara face windfall profit tax on local supplies alongside exports",
                description:
                  "The government on July 1 levied Rs 13 per litre additional excise duty on diesel exported out of India",
                descriptionHTML:
                  "The government on July 1 levied Rs 13 per litre additional excise duty on diesel exported out of India",
                authorId: 1127,
                isPremium: false,
                url: "https://www.business-standard.com/article/pti-stories/reliance-nayara-face-windfall-profit-tax-on-local-supplies-alongside-exports-122081400200_1.html",
                source: "Business Standard",
                videoUrl: "",
                pdfUrl: null,
                imageUrl:
                  "https://bsmedia.business-standard.com/_media/bs/img/article/2022-07/23/full/1658541446-2146.jpg",
              },
              {
                NSEcode: "RELIANCE",
                BSEcode: "500325",
                ISIN: "INE002A01018",
                stockName: "Reliance Industries Ltd.",
                stockId: 1127,
                pageType: "Equity",
                userType: 32,
                insight: {},
                postType: "News",
                postTypeNumber: 1,
                related: null,
                pubDate: "2022-08-14T16:58:58+00:00",
                title:
                  "Reliance Industries shares to turn ex-dividend this week. Here's what you need to know",
                description:
                  "RIL has announced an 80% dividend to its shareholders for FY22. The Mukesh Ambani-led company plans to pay these dividends within a week if declared and approved in the annual general meeting (AGM).",
                descriptionHTML:
                  "RIL has announced an 80% dividend to its shareholders for FY22. The Mukesh Ambani-led company plans to pay these dividends within a week if declared and approved in the annual general meeting (AGM).",
                authorId: 1127,
                isPremium: false,
                url: "https://www.livemint.com/market/stock-market-news/reliance-industries-shares-to-turn-ex-dividend-this-week-here-s-what-you-need-to-know-11660495699870.html",
                source: "livemint",
                videoUrl: "",
                pdfUrl: null,
                imageUrl:
                  "https://images.livemint.com/img/2022/08/14/600x338/377662654_0-14_1637662167406_1660496052715_1660496052715.jpg",
              },
              {
                NSEcode: "RELIANCE",
                BSEcode: "500325",
                ISIN: "INE002A01018",
                stockName: "Reliance Industries Ltd.",
                stockId: 1127,
                pageType: "Equity",
                userType: 32,
                insight: {},
                postType: "News",
                postTypeNumber: 1,
                related: null,
                pubDate: "2022-08-14T05:37:50+00:00",
                title:
                  "Reliance Faces Windfall Profit Tax On Local Supplies Alongside Exports",
                description:
                  "The just-introduced tax on windfall energy profits of oil refiners like Reliance Industries is not only levied on the diesel they export but also on the supplies they make to fuel retailers...",
                descriptionHTML:
                  "The just-introduced tax on windfall energy profits of oil refiners like Reliance Industries is not only levied on the diesel they export but also on the supplies they make to fuel retailers...",
                authorId: 1127,
                isPremium: false,
                url: "https://www.ndtv.com/business/reliance-faces-windfall-profit-tax-on-local-supplies-alongside-exports-3253126",
                source: "NDTV Profit",
                videoUrl: "",
                pdfUrl: null,
                imageUrl:
                  "https://c.ndtvimg.com/2022-04/4f58cq8_reliance-industries_625x300_22_April_22.jpg",
              },
              {
                NSEcode: "RELIANCE",
                BSEcode: "500325",
                ISIN: "INE002A01018",
                stockName: "Reliance Industries Ltd.",
                stockId: 1127,
                pageType: "Equity",
                userType: 32,
                insight: {},
                postType: "News",
                postTypeNumber: 1,
                related: null,
                pubDate: "2022-08-14T05:26:34+00:00",
                title:
                  "Six Of Top 10 Firms' Market Valuation Rises Over Rs 1.5 Lakh Crore",
                description:
                  "The combined market valuation of six of the 10 most valued companies surged by Rs 1,56,247.35 crore last week, with Reliance Industries Ltd (RIL) emerging as the biggest gainer.",
                descriptionHTML:
                  "The combined market valuation of six of the 10 most valued companies surged by Rs 1,56,247.35 crore last week, with Reliance Industries Ltd (RIL) emerging as the biggest gainer.",
                authorId: 1127,
                isPremium: false,
                url: "https://www.ndtv.com/business/six-of-top-10-companies-add-rs-1-56-247-35-cr-to-market-cap-3253078",
                source: "NDTV Profit",
                videoUrl: "",
                pdfUrl: null,
                imageUrl:
                  "https://c.ndtvimg.com/2022-07/25kmg3po_reliance_625x300_25_July_22.jpg",
              },
              {
                NSEcode: "RELIANCE",
                BSEcode: "500325",
                ISIN: "INE002A01018",
                stockName: "Reliance Industries Ltd.",
                stockId: 1127,
                pageType: "Equity",
                userType: 32,
                insight: {},
                postType: "News",
                postTypeNumber: 1,
                related: null,
                pubDate: "2022-08-14T05:20:00+00:00",
                title:
                  "Six of top 10 companies add Rs 1.56 trn to m-cap; RIL biggest gainer",
                description:
                  "The combined market valuation of six of the 10 most valued companies surged by Rs 1,56,247.35 crore last week, with Reliance Industries Ltd (RIL) emerging as the biggest gainer",
                descriptionHTML:
                  "The combined market valuation of six of the 10 most valued companies surged by Rs 1,56,247.35 crore last week, with Reliance Industries Ltd (RIL) emerging as the biggest gainer",
                authorId: 1127,
                isPremium: false,
                url: "https://www.business-standard.com/article/companies/six-of-top-10-companies-add-rs-1-56-trn-to-m-cap-ril-biggest-gainer-122081400178_1.html",
                source: "Business Standard",
                videoUrl: "",
                pdfUrl: null,
                imageUrl:
                  "https://bsmedia.business-standard.com/_media/bs/img/article/2021-07/25/full/1627235647-1993.jpg",
              },
              {
                NSEcode: "RELIANCE",
                BSEcode: "500325",
                ISIN: "INE002A01018",
                stockName: "Reliance Industries Ltd.",
                stockId: 1127,
                pageType: "Equity",
                userType: 32,
                insight: {},
                postType: "News",
                postTypeNumber: 1,
                related: null,
                pubDate: "2022-08-14T05:17:35+00:00",
                title: "Mcap: 6 of top 10 companies add 1,56,247.35 crore",
                description:
                  "Reliance Industries Ltd (RIL) emerged as the biggest gainer.",
                descriptionHTML:
                  "Reliance Industries Ltd (RIL) emerged as the biggest gainer.",
                authorId: 1127,
                isPremium: false,
                url: "https://www.thehindubusinessline.com/markets/mcap-6-of-top-10-companies-add-15624735-crore/article65767901.ece",
                source: "Business Line",
                videoUrl: "",
                pdfUrl: null,
                imageUrl: null,
              },
            ],
            pubDate: "2022-08-16T09:42:36+00:00",
            title:
              "Jeweller who threatened Mukesh Ambani, family sent to police custody till Aug 30",
            description:
              "The accused, 56-year-old Vishnu Bhowmik, was produced before the court on Tuesday.",
            descriptionHTML:
              "The accused, 56-year-old Vishnu Bhowmik, was produced before the court on Tuesday.",
            authorId: 1127,
            isPremium: false,
            url: "https://www.businesstoday.in/latest/economy/story/jeweller-who-threatened-mukesh-ambani-family-sent-to-police-custody-till-aug-30-344781-2022-08-16?utm_source=rssfeed",
            source: "Business Today",
            videoUrl: "",
            pdfUrl: null,
            imageUrl:
              "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202208/mukesh-ambani_1200_0-sixteen_nine.jpg",
          },
          {
            NSEcode: "RELIANCE",
            BSEcode: "500325",
            ISIN: "INE002A01018",
            stockName: "Reliance Industries Ltd.",
            stockId: 1127,
            pageType: "Equity",
            userType: 32,
            insight: {},
            postType: "News",
            postTypeNumber: 1,
            related: null,
            pubDate: "2022-08-15T07:06:12+00:00",
            title:
              "WATCH: Heartfelt video of Mukesh, Nita Ambani celebrating Independence Day 2022 with grandson Prithvi",
            description:
              "In the 18-second-long video shared by news agency ANI, Mukesh Ambani can be seen carrying his grandson in his lap whereas Nita Ambani is waving the tricolour.",
            descriptionHTML:
              "In the 18-second-long video shared by news agency ANI, Mukesh Ambani can be seen carrying his grandson in his lap whereas Nita Ambani is waving the tricolour.",
            authorId: 1127,
            isPremium: false,
            url: "https://www.businesstoday.in/trending/story/watch-heartfelt-video-of-mukesh-nita-ambani-celebrating-independence-day-2022-with-grandson-prithvi-344675-2022-08-15?utm_source=rssfeed",
            source: "Business Today",
            videoUrl: "",
            pdfUrl: null,
            imageUrl:
              "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202208/ezgif-sixteen_nine_135.jpg",
          },
        ],
        qsTime: 1665094230.0,
      },
    };
    setNewsList(newsResponse.body.newsList);
  }, []);

  return (
    <div className="p-5 border rounded-md">
      <h1 className="text-primary text-2xl font-bold">News</h1>
      <div className="flex flex-col h-fit overflow-y-auto max-h-[340px] overflow-hidden">
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
