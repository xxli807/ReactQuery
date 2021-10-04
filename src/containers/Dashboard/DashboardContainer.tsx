import React, { useEffect, useState } from "react";
import Details from "./components/Details";
import { useQuery } from "react-query";
import { getUsers } from "./api";

function DashboardContainer() {
  const [showDetail, setShowDetail] = useState(false);

  const { isLoading, data } = useQuery("users", getUsers);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <>
      <div>DashboardContainer</div>
      <button onClick={() => setShowDetail(!showDetail)}>Show Detail</button>

      {showDetail ? <Details users={data?.data} /> : null}
    </>
  );
}

export default React.memo(DashboardContainer);
