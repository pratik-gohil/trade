import * as React from "react";
import { store } from "../../app/store";
import {
  widget,
  ChartingLibraryWidgetOptions,
  LanguageCode,
  IChartingLibraryWidget,
  ResolutionString,
} from "../../charting_library";
import Datafeed from "./datafeed";

export interface ChartContainerProps {
  instrument?: any;
  debug?: ChartingLibraryWidgetOptions["debug"];
  symbol: ChartingLibraryWidgetOptions["symbol"];
  interval: ChartingLibraryWidgetOptions["interval"];

  // BEWARE: no trailing slash is expected in feed URL
  libraryPath: ChartingLibraryWidgetOptions["library_path"];
  // datafeedUrl: string;
  // chartsStorageUrl: ChartingLibraryWidgetOptions["charts_storage_url"];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions["charts_storage_api_version"];
  clientId: ChartingLibraryWidgetOptions["client_id"];
  userId: ChartingLibraryWidgetOptions["user_id"];
  fullscreen: ChartingLibraryWidgetOptions["fullscreen"];
  autosize: ChartingLibraryWidgetOptions["autosize"];
  studiesOverrides: ChartingLibraryWidgetOptions["studies_overrides"];
  container: ChartingLibraryWidgetOptions["container"];
}

export interface ChartContainerState {}

function getLanguageFromURL(): LanguageCode | null {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : (decodeURIComponent(results[1].replace(/\+/g, " ")) as LanguageCode);
}

export class TVChartContainer extends React.PureComponent<
  Partial<ChartContainerProps>,
  ChartContainerState
> {
  // state = store.getState();
  // instrument = this.state.tvc.instrument;

  public static defaultProps: Omit<ChartContainerProps, "container"> = {
    debug: false,
    symbol: "",
    // symbol: "NSECM:RELIANCE",
    // symbol: `${this.instrument.DisplayName}:${this.instrument.ExchangeSegment}:${this.instrument.ExchangeInstrumentID}`;
    interval: "D" as ResolutionString,
    libraryPath: "/charting_library/",
    // datafeedUrl: "https://demo_feed.tradingview.com",
    // chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  private tvWidget: IChartingLibraryWidget | null = null;
  private ref: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount(): void {
    if (this.ref.current) {
      const widgetOptions: ChartingLibraryWidgetOptions = {
        debug: this.props.debug as boolean,
        // symbol: this.props.symbol as string,

        symbol: `${this.props.instrument?.ExchangeSegment}:${this.props.instrument?.DisplayName}:${this.props.instrument?.ExchangeInstrumentID}`,
        // BEWARE: no trailing slash is expected in feed URL
        // tslint:disable-next-line:no-any
        datafeed: Datafeed as any,
        interval: this.props
          .interval as ChartingLibraryWidgetOptions["interval"],
        container: this.ref.current,
        library_path: this.props.libraryPath as string,
        timezone: "Asia/Kolkata",
        locale: getLanguageFromURL() || "en",
        disabled_features: [
          // "use_localstorage_for_settings",
          "header_symbol_search",
          "symbol_search_hot_key",
          "header_compare",
          "header_settings",
        ],
        enabled_features: ["hide_left_toolbar_by_default", "study_templates"],
        charts_storage_api_version: this.props.chartsStorageApiVersion,
        client_id: this.props.clientId,
        user_id: this.props.userId,
        fullscreen: this.props.fullscreen,
        autosize: this.props.autosize,
        studies_overrides: this.props.studiesOverrides,
      };

      const tvWidget = new widget(widgetOptions);
      this.tvWidget = tvWidget;

      tvWidget.onChartReady(() => {});
    }
  }

  public componentWillUnmount(): void {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  public componentDidUpdate(
    prevProps: Readonly<Partial<ChartContainerProps>>,
    prevState: Readonly<ChartContainerState>,
    snapshot?: any
  ): void {
    if (prevProps.instrument !== this.props.instrument) {
      if (!this.ref.current) {
        return;
      }

      const widgetOptions: ChartingLibraryWidgetOptions = {
        debug: this.props.debug as boolean,
        // symbol: this.props.symbol as string,

        symbol: `${this.props.instrument?.ExchangeSegment}:${this.props.instrument?.DisplayName}:${this.props.instrument?.ExchangeInstrumentID}`,
        // BEWARE: no trailing slash is expected in feed URL
        // tslint:disable-next-line:no-any
        datafeed: Datafeed as any,
        interval: this.props
          .interval as ChartingLibraryWidgetOptions["interval"],
        container: this.ref.current,
        library_path: this.props.libraryPath as string,
        timezone: "Asia/Kolkata",
        locale: getLanguageFromURL() || "en",
        disabled_features: [
          "use_localstorage_for_settings",
          "header_symbol_search",
          "symbol_search_hot_key",
          "header_compare",
          "header_settings",
        ],
        enabled_features: ["hide_left_toolbar_by_default", "study_templates"],
        charts_storage_api_version: this.props.chartsStorageApiVersion,
        client_id: this.props.clientId,
        user_id: this.props.userId,
        fullscreen: this.props.fullscreen,
        autosize: this.props.autosize,
        studies_overrides: this.props.studiesOverrides,
      };

      const tvWidget = new widget(widgetOptions);
      this.tvWidget = tvWidget;

      tvWidget.onChartReady(() => {});
    }
  }

  public render(): JSX.Element {
    return <div ref={this.ref} className="flex-1 border rounded-md" />;
  }
}
