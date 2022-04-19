import { range } from 'lodash';
import { useMemo } from 'react';

export type PaginationType = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: Array<number | string>;
};

export type PageProps = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
};

function usePagination({ totalCount, currentPage, pageSize }: PageProps) {
  const paginationRange = useMemo(() => {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    const totalPages = Math.ceil(totalCount / pageSize);

    const startPage = 1;
    const endPage = totalPages;

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalCount - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages: Array<number | string> = [1, 2, 3, 4, 5, 6, 7];
    if (totalPages <= 7) {
      pages = range(startPage, endPage + 1);
    } else {
      // if the total pages are more than 7 the default setting will be
      // 1-2-3-4-5-...endPage
      pages.splice(0, 1, 1);
      pages.splice(6, 1, endPage);
      pages.splice(5, 1, '...');

      // when the current page reaches values higher than 4 the setting will change
      // in function of the difference between the last page and the current.
      const forwardDif = endPage - currentPage;
      if (currentPage > 4) {
        // while the current page is higher than 4 and lower than the last page diminished in 3
        // the focus will be in the three central items
        // ex: 1-...-5-6-7-...endPage
        pages.splice(1, 1, '...');
        pages.splice(2, 1, currentPage - 1);
        pages.splice(3, 1, currentPage);
        pages.splice(4, 1, currentPage + 1);

        // the sixth item appears when the difference is less than 4
        if (forwardDif < 4) {
          pages.splice(5, 1, endPage - 1);
        }

        // when the current page reaches the values that are lower than the last page minus 3
        // the selected page keep moving forward leaving the middle items
        // and getting closer to the last page
        if (forwardDif < 3 && forwardDif > 1) {
          pages.splice(2, 1, currentPage - 2);
          pages.splice(3, 1, currentPage - 1);
          pages.splice(4, 1, currentPage);
        }
        if (forwardDif < 2) {
          pages.splice(2, 1, currentPage - 3);
          pages.splice(3, 1, currentPage - 2);
          pages.splice(4, 1, currentPage - 1);
          pages.splice(5, 1, currentPage);
        }
        if (forwardDif === 0) {
          pages.splice(2, 1, endPage - 4);
          pages.splice(3, 1, endPage - 3);
          pages.splice(4, 1, endPage - 2);
          pages.splice(5, 1, endPage - 1);
        }
      }
    }

    // return object with all pager properties required by the view
    return {
      totalCount: totalCount,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }, [totalCount, pageSize, currentPage]);

  return paginationRange;
}

export default usePagination;
