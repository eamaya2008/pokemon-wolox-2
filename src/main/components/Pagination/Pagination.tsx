import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDirectDispatch } from '../../../hooks';
import usePagination, { PaginationType } from '../../../hooks/usePagination';
import { obtainPokemons } from '../../store/main/mainActions';
import { selectMaxLimit } from '../../store/main/mainSelector';
import PagerComponent from './Pager';
import PaginationList from './PaginationsList';

const Pagination: FunctionComponent<{}> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const totalCount = useSelector(selectMaxLimit);
  const obtainPokemonsTrigger = useDirectDispatch(obtainPokemons);

  const pager: PaginationType = usePagination({ totalCount, currentPage, pageSize });

  function updatePage(page: number) {
    if (page < 1 || page > pager.totalPages) {
      return;
    }

    setCurrentPage(page);
  }

  useEffect(() => {
    obtainPokemonsTrigger(pager.startIndex, pager.pageSize);
  }, [pager, obtainPokemonsTrigger]);

  return (
    <nav className="pager-container">
      {pager.pages.length > 0 && (
        <PagerComponent
          currentPage={pager.currentPage}
          totalPages={pager.totalPages}
          pages={pager.pages}
          setPage={updatePage}
        />
      )}
      <PaginationList setPageSize={(value: number) => setPageSize(value)} pageSize={pageSize} />
    </nav>
  );
};

export default Pagination;
