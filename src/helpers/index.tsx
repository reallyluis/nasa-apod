export interface PictureOfTheDay {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

export const Loading = () => (
  <div className="loading">
    <div className="spinner"></div>
  </div>
);

export const ErrorMessage = ({errorMsg}: {errorMsg: string}) => (
  <div>{errorMsg}</div>
);
