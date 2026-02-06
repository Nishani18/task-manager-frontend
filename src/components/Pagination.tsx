import "../App.css";
import type { PaginationInfo } from "../types/api.types";

interface PaginationProps {
  info: PaginationInfo;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const Pagination = ({
  info,
  onPageChange,
  loading = false,
}: PaginationProps) => {
  if (info.totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={!info.hasPrevPage || loading}
        onClick={() => onPageChange(info.currentPage - 1)}
      >
        Previous
      </button>

      <span className="pagination-info">
        Page {info.currentPage} of {info.totalPages}
      </span>

      <button
        className="pagination-btn"
        disabled={!info.hasNextPage || loading}
        onClick={() => onPageChange(info.currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
