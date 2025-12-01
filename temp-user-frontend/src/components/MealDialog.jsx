import { ChevronLeftIcon, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const DialogStickyFooterDemo = ({ imgLink, title, description,price}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="">
          <Info />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[min(600px,80vh)] flex-col gap-0 p-0 sm:max-w-md">
        <DialogHeader className="contents space-y-0 text-left">
          <ScrollArea className="flex max-h-full flex-col overflow-hidden">
            <DialogTitle className="px-6 pt-6">Product Information</DialogTitle>
            <DialogDescription asChild>
              <div className="p-6">
                <div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
                  <div className="space-y-1">
                    <p>
                      <strong>Item Img:</strong>
                    </p>
                    <img
                      src="https://media.istockphoto.com/id/1456234806/photo/mango-ice-cream-served-in-cup-isolated-on-grey-background-top-view-of-indian-and-bangladesh.jpg?s=2048x2048&w=is&k=20&c=roTFn2xy4mwGPoV-rOJ8l3ZCh2xfNnn6aaUVY-crPY4="
                      alt="Content image"
                      className="w-full rounded"
                    />
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Item Name:</strong>
                    </p>
                    <p>{title}</p>  
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Item Description:</strong>
                    </p>
                    <p>{description}</p>  
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Item Price:</strong>
                    </p>
                    <p>{price}</p>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </ScrollArea>
        </DialogHeader>
        <DialogFooter className="flex-row items-center justify-end border-t px-6 py-4">
          <DialogClose asChild>
            <Button variant="outline">
              <ChevronLeftIcon />
              Back
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogStickyFooterDemo;
