"use client";
import { useEffect, useState } from "react";
import ProjectForm from "../../../../../components/dashboard/project/ProjectForm";

export default function EditProject({ params }) {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    fetch(`/api/projects/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProjectData(data));
  }, [params.id]);

  if (!projectData) {
    return (
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 w-64 bg-gray-800 rounded"></div>
            <div className="h-6 w-full bg-gray-800 rounded"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return <ProjectForm mode="edit" projectData={projectData} />;
}
