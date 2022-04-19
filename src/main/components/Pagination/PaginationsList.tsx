import React, { FunctionComponent, useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

type PaginationListProps = {
  pageSize: number;
  setPageSize: Function;
};

const PaginationList: FunctionComponent<PaginationListProps> = ({ pageSize, setPageSize }) => {
  const pageSizes = [5, 10, 20, 50, 100];
  const [showList, setShowList] = useState<boolean>(false);

  return (
    <div className="page-size">
      <div className="page-size-action" onClick={() => setShowList(!showList)}>
        <div className="page-size-current">{pageSize}</div>
        <button className="page-size-button">
          {showList ? <ChevronUp size={'15px'} /> : <ChevronDown size={'15px'} />}
        </button>
      </div>
      {showList && (
        <ul className="page-size-list">
          {pageSizes.map((p) => (
            <li
              key={p}
              onClick={() => {
                setShowList(false);
                setPageSize(p);
              }}
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default PaginationList;
