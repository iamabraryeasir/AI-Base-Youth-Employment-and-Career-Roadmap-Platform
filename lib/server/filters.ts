export function buildJobFilters(request: Request) {
  const url = new URL(request.url);

  const search = url.searchParams.get("search");
  const experienceLevel = url.searchParams.get("experienceLevel");
  const jobType = url.searchParams.get("jobType");
  const location = url.searchParams.get("location");
  const skill = url.searchParams.get("skill");

  const filter: any = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (experienceLevel) filter.experienceLevel = experienceLevel;
  if (jobType) filter.jobType = jobType;
  if (location) filter.location = location;
  if (skill) filter.requiredSkills = { $in: [skill] };

  return filter;
}

export function buildResourceFilters(request: Request) {
  const url = new URL(request.url);

  const search = url.searchParams.get("search");
  const cost = url.searchParams.get("cost");
  const skill = url.searchParams.get("skill");

  const filter: any = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { platform: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (cost) filter.cost = cost;
  if (skill) filter.relatedSkills = { $in: [skill] };

  return filter;
}
