import React, { useState } from "react";
import { getUser, User } from "../api";

import { useQuery } from "react-query";

interface Props {
  users: User[] | undefined;
}

function Details({ users }: Props) {
  const [selectedUserId, setSelectedUserId] = useState(0);

  const handleOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.dataset.id) {
      setSelectedUserId(parseInt(e.currentTarget.dataset.id));
    }
  };

  const { isLoading, data, isFetching } = useQuery(
    ["user", selectedUserId],
    async () => {
      const user = await getUser(selectedUserId);
      return user;
    },
    {
      keepPreviousData: true,
      enabled: Boolean(selectedUserId),
      staleTime: 30000,
    }
    // https://react-query.tanstack.com/guides/caching
    // react query cache the data by default 3min, and mark it stale
    // but at same time it will do a background refetch.
    // so the isLoading is not shown and the isFetching flag is showing
    // set enabled to true to fix the undefine check and set staleTime to 3 min
  );

  return (
    <>
      <ul>
        {users?.map((user) => {
          return (
            <li
              key={user.id}
              onClick={handleOnClick}
              data-id={user.id}
            >{`${user.name}-${user.email}`}</li>
          );
        })}
      </ul>
      +<div>{isFetching ? "isFetching..." : ""}</div>
      <div>{isLoading ? "loading..." : ""}</div>
      <div>{data?.email}</div>
    </>
  );
}

export default Details;
