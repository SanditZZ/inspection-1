"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { HistoryDataTable } from "@/views/history/components/history-table/HistoryDataTable";
import { columns } from "@/views/history/components/history-table/history-columns";
import useFetchAllInspections from "@/views/history/hooks/useFetchAllInspections";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function HistoryPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: historyData, error } = useFetchAllInspections(searchTerm);

  if (error) {
    return <div>Error loading history data</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center">History</h1>

      <div className="flex justify-end">
        <Button asChild variant="default" type="button">
          <Link href="/inspection/create">
            <PlusIcon /> Create Inspection
          </Link>
        </Button>
      </div>

      <div className="flex items-center py-4">
        <Input
          placeholder="Search by Inspection ID"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchTerm(searchInput);
            }
          }}
          className="max-w-sm"
        />

        <Button type="submit" className="ml-2" onClick={() => setSearchTerm(searchInput)}>
          <SearchIcon />
          Search
        </Button>
      </div>

      <HistoryDataTable columns={columns} data={historyData || []} />
    </>
  );
}
