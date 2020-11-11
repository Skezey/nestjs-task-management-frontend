import React from "react";
import { usePaginatedQuery } from "react-query";

import Project from "../../components/Project";

const fetchProjects = async (key) => {
  const res = await fetch(`http://localhost:3001/projects`, {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  });
  return res.json();
};

const ProjectsIndex = () => {
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["projects"],
    fetchProjects
  );

  return (
    <div>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <div>
            {resolvedData.map((project) => (
              <Project key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsIndex;
