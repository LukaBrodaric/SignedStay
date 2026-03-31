import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Plus, User, Building2 } from "lucide-react";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    where: { role: "CLIENT" },
    include: {
      _count: {
        select: { properties: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <Header
        title="Client Users"
        subtitle="Manage your client accounts and their properties"
        user={{ name: session.user.name, email: session.user.email }}
        action={
          <Link href="/admin/users/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </Link>
        }
      />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="pt-4 pb-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Name
                    </th>
                    <th className="pt-4 pb-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email
                    </th>
                    <th className="pt-4 pb-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Properties
                    </th>
                    <th className="pt-4 pb-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Created
                    </th>
                    <th className="pt-4 pb-4 px-6 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
                            <User className="h-4 w-4 text-indigo-600" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {user.email}
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="default">
                          {user._count.properties} {user._count.properties === 1 ? "property" : "properties"}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end">
                          <Link href={`/admin/properties?userId=${user.id}`}>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                              <Building2 className="mr-1.5 h-4 w-4" />
                              View Properties
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <User className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-gray-500 mb-2">
                            No users yet
                          </p>
                          <p className="text-sm text-gray-400 mb-4">
                            Create your first user to get started
                          </p>
                          <Link href="/admin/users/new">
                            <Button>
                              <Plus className="mr-2 h-4 w-4" />
                              Add New User
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
