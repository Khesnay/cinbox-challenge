import React from "react";

type Props = {
  error: string | null;
};

const NotFoundPage = (props: Props) => {
  return (
    <div>
      NotFoundPage
      {props.error && <p>{props.error}</p>}
    </div>
  );
};

export default NotFoundPage;
