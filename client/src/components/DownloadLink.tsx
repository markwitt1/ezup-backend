type Props = {
  id: string;
};

const DownloadLink = ({ id }: Props) => {
  return (
    <a
      href={`${process.env.REACT_APP_API_URL || ""}/download/${id}`}
      rel="noreferrer"
    >
      Download
    </a>
  );
};

export default DownloadLink;
