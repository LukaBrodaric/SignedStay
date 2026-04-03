"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Plus, User, Building2, Trash2, X, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface UserType {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  _count: {
    properties: number;
  };
}

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; user: UserType | null }>({
    open: false,
    user: null,
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (session && (session.user as any).role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }
    fetchUsers();
  }, [session, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.user) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users?id=${deleteModal.user.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to delete user");
        return;
      }

      toast.success("User deleted successfully");
      setUsers(users.filter((u) => u.id !== deleteModal.user!.id));
      setDeleteModal({ open: false, user: null });
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  if (!session) {
    return null;
  }

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
      <div className="max-w-7xl mx-auto pt-6">
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
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-16 text-center">
                        <div className="flex flex-col items-center">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <User className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-gray-500 mb-2">No users yet</p>
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
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
                              <User className="h-4 w-4 text-indigo-600" />
                            </div>
                            <span className="font-medium text-gray-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{user.email}</td>
                        <td className="py-4 px-6">
                          <Badge variant="default">
                            {user._count.properties}{" "}
                            {user._count.properties === 1 ? "property" : "properties"}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 text-gray-500 text-sm">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/properties?userId=${user.id}`}>
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                                <Building2 className="mr-1.5 h-4 w-4" />
                                View Properties
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => setDeleteModal({ open: true, user })}
                            >
                              <Trash2 className="mr-1.5 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.open && deleteModal.user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Delete User</h2>
              </div>
              <button
                onClick={() => setDeleteModal({ open: false, user: null })}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 mb-3">
                Are you sure you want to delete this user?
              </p>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="font-medium text-gray-900">{deleteModal.user.name}</p>
                <p className="text-sm text-gray-500">{deleteModal.user.email}</p>
              </div>
              {deleteModal.user._count.properties > 0 && (
                <p className="mt-3 text-sm text-red-600">
                  This user has {deleteModal.user._count.properties} property(s). Delete the properties first.
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteModal({ open: false, user: null })}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDelete}
                disabled={deleting || deleteModal.user._count.properties > 0}
              >
                {deleting ? "Deleting..." : "Delete User"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
