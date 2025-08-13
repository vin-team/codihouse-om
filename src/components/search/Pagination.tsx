'use client';

import React from 'react';
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage?: number;
  estimatedTotalHits?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  estimatedTotalHits,
  onPageChange
}) => {
  const computedTotalPages = React.useMemo(() => {
    if (typeof estimatedTotalHits === 'number') {
      return Math.max(1, Math.ceil(estimatedTotalHits / 5));
    }
    return 1;
  }, [estimatedTotalHits]);

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = typeof computedTotalPages === 'number' ? currentPage >= computedTotalPages : false;

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  const getVisiblePages = () => {
    const pages: Array<number | 'ellipsis'> = [];
    if (typeof computedTotalPages === 'number') {
      const total = computedTotalPages;
      const start = Math.max(1, Math.min(currentPage - 1, Math.max(1, total - 2)));
      const end = Math.min(total, start + 2);
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total) pages.push('ellipsis');
      return pages;
    }
    const start = currentPage <= 2 ? 1 : currentPage - 1;
    for (let i = start; i < start + 3; i++) pages.push(i);
    pages.push('ellipsis');
    return pages;
  };

  return (
    <PaginationUI>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious role='button' onClick={handlePrevious} className={isPrevDisabled ? 'pointer-events-none opacity-50' : ''} />
        </PaginationItem>
        {getVisiblePages().map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? <PaginationEllipsis /> : (
              <PaginationLink role='button' onClick={() => handlePageClick(Number(page))} isActive={currentPage === Number(page)}>
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext role='button' onClick={handleNext} className={isNextDisabled ? 'pointer-events-none opacity-50' : ''} />
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
};

export default Pagination;