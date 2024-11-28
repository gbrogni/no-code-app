'use client';

import { useRouter } from 'next/navigation';
import { Project } from '@/interfaces/project';
import { Progress } from '@/components/ui/progress';
import { createColumn, createCustomCellColumn, DataTableColumn } from '@/components/data-table/utils/data-table-utils';
import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { SquarePlus } from 'lucide-react';

class ProjectGenerator {
  static generateProjects(count: number): Project[] {
    const projects: Project[] = [];
    for (let i = 1; i <= count; i++) {
      projects.push({
        id: `${i}`,
        name: `Project ${String.fromCharCode(64 + (i % 26) || 26)}`,
        description: `Description for Project ${String.fromCharCode(64 + (i % 26) || 26)}`,
        bandWidthLimit: { limit: 1000 + i * 100, consumed: 200 + i * 10 },
        requestLimit: { limit: 5000 + i * 500, consumed: 1200 + i * 50 },
        storageLimit: { limit: 100 + i * 10, consumed: 50 + i * 5 },
      });
    }
    if (projects.length > 0) {
      projects[0].bandWidthLimit = { limit: 1000, consumed: 750 };
      projects[0].requestLimit = { limit: 5000, consumed: 4750 };
    }
    return projects;
  }
}

const mockProjects: Project[] = ProjectGenerator.generateProjects(1000);

export default function Home() {
  const router = useRouter();

  const handleRowClick = (project: Project) => {
    router.push(`/project/${project.id}`);
  };

  const columns: DataTableColumn<Project>[] = [
    createColumn<Project>('id', 'ID'),
    createColumn<Project>('name', 'Name', true),
    createCustomCellColumn<Project>('bandWidthLimit', 'Bandwidth Usage', (row) => (
      <Progress
        current={row.bandWidthLimit.consumed}
        limit={row.bandWidthLimit.limit}
        value={(row.bandWidthLimit.consumed / row.bandWidthLimit.limit) * 100}
      />
    )),
    createCustomCellColumn<Project>('requestLimit', 'Request Usage', (row) => (
      <Progress
        current={row.requestLimit.consumed}
        limit={row.requestLimit.limit}
        value={(row.requestLimit.consumed / row.requestLimit.limit) * 100}
      />
    )),
    createCustomCellColumn<Project>('storageLimit', 'Storage Usage', (row) => (
      <Progress
        current={row.storageLimit.consumed}
        limit={row.storageLimit.limit}
        value={(row.storageLimit.consumed / row.storageLimit.limit) * 100}
      />
    )),
  ];

  return (
    <div className="flex-grow flex flex-col justify-between p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, Gabriel!</h2>
          <p className="text-muted-foreground">
            Here are your projects.
          </p>
        </div>
        <Button>
          <SquarePlus /> New Project
        </Button>
      </div>
      <div className="flex-grow w-full border border-gray-300 rounded-lg p-4 md:p-8 min-h-[300px]">
        <DataTable columns={columns} data={mockProjects} onRowClick={handleRowClick} />
      </div>
    </div>
  );
}