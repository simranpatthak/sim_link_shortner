"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash, Copy } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Logs() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/links/user");
      setLinks(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch links!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/api/links/${deleteId}`);
      toast.success("Link deleted successfully!");
      setLinks(links.filter(link => link._id !== deleteId));
    } catch (error) {
      toast.error("Failed to delete link!");
    } finally {
      setDeleteId(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Links</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Original URL</TableHead>
            <TableHead>Short URL</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Loading...
              </TableCell>
            </TableRow>
          ) : links?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No links found.
              </TableCell>
            </TableRow>
          ) : (
            links?.map((link:any) => (
              <TableRow key={link._id}>
                <TableCell className="truncate max-w-[150px]">{link.url}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <a href={`/${link.shortId}`} target="_blank" className="text-blue-600 underline">
                    /{link.shortId}
                  </a>
                  <Button onClick={() => copyToClipboard(`${window.location.origin}/${link.shortId}`)} size="icon">
                    <Copy size={16} />
                  </Button>
                </TableCell>
                <TableCell>{link.views}</TableCell>
                <TableCell>{new Date(link.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => setDeleteId(link._id)}
                    className="bg-red-500 hover:bg-red-600"
                    size="icon"
                  >
                    <Trash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action cannot be undone.</p>
          <DialogFooter>
            <Button onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
