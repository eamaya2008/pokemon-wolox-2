import React, { FunctionComponent } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

type PagerComponentProps = {
  currentPage: number;
  totalPages: number;
  pages: Array<string | number>;
  setPage: Function;
};

const PagerComponent: FunctionComponent<PagerComponentProps> = ({ currentPage, totalPages, setPage, pages }) => {
  return (
    <div className="pager">
      <ul className="pagination">
        <li aria-disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
          <ChevronLeft size={'18px'} />
        </li>
        {pages.map((page, index) => (
          <li key={index} className="pages" style={{ backgroundColor: `${currentPage === page ? '#F8D030' : ''}` }}>
            <a onClick={() => setPage(page as number)}>{page}</a>
          </li>
        ))}
        <li aria-disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>
          <ChevronRight size={'18px'} />
        </li>
      </ul>
    </div>
  );
};

export default PagerComponent;
