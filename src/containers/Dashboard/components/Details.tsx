import React, { useState } from "react";
import { getUser, User } from "../api";

import { useQuery } from "react-query";

interface Props {
  users: User[] | undefined;
}

function Details({ users }: Props) {
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setSelectedUserId(e.currentTarget.dataset.id!);
  };

  const { isLoading, data, isFetching } = useQuery(
    ["user", selectedUserId],
    async () => {
      if (!selectedUserId) {
        return undefined;
      }

      const data = await getUser(parseInt(selectedUserId));
      return data;
    },
    { keepPreviousData: true } // ? react query is not cache the data
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
