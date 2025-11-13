import AllJobsTable from "@/components/dashboard/all-jobs-table";

export default function JobsPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-3">All Available Jobs</h1>

      <AllJobsTable />
    </section>
  );
}
