import React from "react";
import {
    Pagination as BootstrapPagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"; // Ajusta la importación según tu estructura de archivos

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void; 
}

const PaginationComponent: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    setCurrentPage,
    }) => {
    return (
        <BootstrapPagination className="mt-2">
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
                <PaginationLink
                href="#"
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
                >
                {index + 1}
                </PaginationLink>
            </PaginationItem>
            ))}
            <PaginationItem>
            <PaginationNext
                href="#"
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            />
            </PaginationItem>
        </PaginationContent>
        </BootstrapPagination>
    );
};

export default PaginationComponent;
