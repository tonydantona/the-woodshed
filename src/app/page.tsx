"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("not-completed");
  const [hintsInput, setHintsInput] = useState("");
  const [systemSuggestions, setSystemSuggestions] = useState("");
  const [candidateRoutines, setCandidateRoutines] = useState("");
  const [todaysRoutine, setTodaysRoutine] = useState("");

  return (
    <div className="min-h-screen bg-[#e8e8e8] p-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {/* Left Panel - Select Category */}
        <Card className="bg-[#8a8a8a] border-none shadow-lg">
          <CardHeader className="pb-0">
            <Select defaultValue="option1">
              <SelectTrigger
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                  w-auto
                  h-auto
                  text-sm
                "
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Daily</SelectItem>
                <SelectItem value="option2">One Day</SelectItem>
                <SelectItem value="option3">Two/Three Days</SelectItem>
                <SelectItem value="option4">One Week</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="-mt-4">
              <Label className="text-black font-normal mb-2 block">
                Random:
              </Label>
              <RadioGroup
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="not-completed"
                    id="not-completed"
                    className="border-black"
                  />
                  <Label
                    htmlFor="not-completed"
                    className="text-black font-normal"
                  >
                    Not Completed
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="completed"
                    id="completed"
                    className="border-black"
                  />
                  <Label htmlFor="completed" className="text-black font-normal">
                    Completed
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="all"
                    id="all"
                    className="border-black"
                  />
                  <Label htmlFor="all" className="text-black font-normal">
                    All
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-2">
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Add To Preview
              </Button>

              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Reset Virtual Jar
              </Button>
            </div>

            <div className="border-t border-gray-400 mb-3 mt-6"></div>

            <div className="mt-4">
              <Label className="text-black font-normal mb-2 block">
                Hints Input:
              </Label>
              <Textarea
                value={hintsInput}
                onChange={(e) => setHintsInput(e.target.value)}
                className="bg-[#d9d9d9] border-2 border-[#50bcea] text-black resize-none min-h-[80px]"
              />
            </div>

            <div className="flex gap-2">
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Find
              </Button>
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Clear
              </Button>
            </div>

            <div>
              <Label className="text-black font-normal mb-2 block">
                System Suggestions Output:
              </Label>
              <Textarea
                value={systemSuggestions}
                onChange={(e) => setSystemSuggestions(e.target.value)}
                className="bg-[#d9d9d9] border-2 border-[#50bcea] text-black resize-none min-h-[120px]"
              />
            </div>

            <div className="flex gap-2">
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Add To Preview
              </Button>
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Middle Panel - Preview */}
        <Card className="bg-[#8a8a8a] border-none shadow-lg">
          <CardHeader className="pb-1">
            <CardTitle className="text-black text-2xl font-normal text-center">
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-black font-normal mb-2 block">
                Candidate Routines:
              </Label>
              <Textarea
                value={candidateRoutines}
                onChange={(e) => setCandidateRoutines(e.target.value)}
                className="bg-[#d9d9d9] border-2 border-[#50bcea] text-black resize-none min-h-[420px]"
              />
            </div>

            <div className="flex gap-2 justify-center">
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Add Checked To Practice
              </Button>
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Clear Unchecked
              </Button>
            </div>

            <div className="flex gap-2 justify-center">
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Show Virtual Jar
              </Button>
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Today's Practice */}
        <Card className="bg-[#8a8a8a] border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-black text-2xl font-normal text-center">
              Today&apos;s Practice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-black font-normal mb-2 block">
                Today&apos;s Routine:
              </Label>
              <Textarea
                value={todaysRoutine}
                onChange={(e) => setTodaysRoutine(e.target.value)}
                className="bg-[#d9d9d9] border-2 border-[#50bcea] text-black resize-none min-h-[420px]"
              />
            </div>

            <div className="flex gap-2 justify-center">
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Pin Selected
              </Button>
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Clear All
              </Button>
            </div>

            <div className="flex gap-2 justify-center">
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Mark Completed
              </Button>
              <Button
                className="
                  px-6 py-1
                  bg-[#C3C3C3]
                  hover:bg-[#dedbd7]
                  text-black-900
                  font-medium
                  rounded-md
                  border border-pink-300
                  shadow-sm
                  transition-all duration-150
                  active:scale-95
                "
              >
                Log Practice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
