import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";

export default function TodoList() {
  return (
    <div className="px-28">
      <div className="flex items-center pb-8">
        <div className="inline-flex h-16 items-center justify-center rounded-md w-full text-4xl font-medium bg-primary text-primary-foreground shadow">
          To-Do List
        </div>
      </div>
      <div className="flex max-w-full items-center space-x-2 pb-8">
        <Input
          className="h-16 text-lg"
          type="text"
          placeholder="Something to do..."
        />
        <Button className="h-16 text-lg" type="button">
          +
        </Button>
      </div>
      <div className="items-top flex space-x-2 pb-6 pl-6">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Teaching Material in Penn
          </label>
        </div>
      </div>
      <div className="items-top flex space-x-2 pb-6 pl-6">
        <Checkbox id="terms2" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms2"
            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Teaching Material in Penn
          </label>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <p className="mx-4">
          目前有 <span className="font-medium">1</span> 個事項待完成
        </p>

        <Button type="button">Clear All Task</Button>
      </div>
    </div>
  );
}
