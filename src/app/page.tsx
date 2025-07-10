"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("daily");
  const [selectedState, setSelectedState] = useState("not_completed");
  const [hintsInput, setHintsInput] = useState("");
  const [systemSuggestions, setSystemSuggestions] = useState("");

  // use an array to store routine objects with checkboxes
  const [routines, setRoutines] = useState<Array<{id: string, text: string, category: string, checked: boolean}>>([]);

  const [todaysRoutines, setTodaysRoutines] = useState<Array<{id: string, text: string, category: string, checked: boolean}>>([]);

  const toggleRoutineCheck = (routineId: string) => {
    setRoutines(prev => prev.map(routine => 
      routine.id === routineId 
        ? { ...routine, checked: !routine.checked }
        : routine
    ));
  };

  const toggleTodaysRoutineCheck = (routineId: string) => {
    setTodaysRoutines(prev => prev.map(routine => 
      routine.id === routineId 
        ? { ...routine, checked: !routine.checked }
        : routine
    ));
  };

  const addCheckedToPractice = () => {
    const checkedRoutines = routines.filter(routine => routine.checked);
    if (checkedRoutines.length === 0) return;
    
    // Create new routine objects with new IDs for Today's Practice
    const newTodaysRoutines = checkedRoutines.map(routine => ({
      ...routine,
      id: `todays-${Date.now()}-${Math.random()}`,
      checked: false // Reset checkbox state for Today's Practice
    }));
    
    setTodaysRoutines(prev => [...prev, ...newTodaysRoutines]);
    
    // Remove checked routines from Preview panel
    setRoutines(prev => prev.filter(routine => !routine.checked));
  };

  const clearUncheckedRoutines = () => {
    // Keep only checked routines (remove unchecked ones)
    setRoutines(prev => prev.filter(routine => routine.checked));
  };

  const clearAllRoutines = () => {
    // Remove all routines from Preview panel
    setRoutines([]);
  };

  return (
    <div className="min-h-screen bg-[#e8e8e8] p-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {/* Left Panel - Select Category */}
        <Card className="bg-[#8a8a8a] border-none shadow-lg">
          <CardHeader className="pb-0">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="one_day">One Day</SelectItem>
                <SelectItem value="two_three_days">Two/Three Days</SelectItem>
                <SelectItem value="one_week">One Week</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="-mt-4">
              <Label className="text-black font-normal mb-2 block">
                Random:
              </Label>
              <RadioGroup
                value={selectedState}
                onValueChange={setSelectedState}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="not_completed"
                    id="not_completed"
                    className="border-black"
                  />
                  <Label
                    htmlFor="not_completed"
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
                onClick={async () => {
                  try {
                    const res = await fetch(`http://127.0.0.1:5050/api/get-random-routine-by-category-state?category=${selectedCategory}&state=${selectedState}`);
                    const data = await res.json();
                    const routine = data.message || "No message returned";
                    const newRoutine = {
                      id: Date.now().toString(),
                      text: `${routine.toLowerCase()} (${selectedCategory.replace('_', ' ')})`,
                      category: selectedCategory,
                      checked: false
                    };
                    setRoutines(prev => [...prev, newRoutine]);
                  } catch (err) {
                    const errorRoutine = {
                      id: Date.now().toString(),
                      text: "error fetching routine",
                      category: selectedCategory,
                      checked: false
                    };
                    setRoutines(prev => [...prev, errorRoutine]);
                  }
                }}
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
              <div className="bg-[#d9d9d9] border-2 border-[#50bcea] text-black resize-none min-h-[420px] p-3 rounded-md overflow-y-auto">
                {routines.length === 0 ? (
                  <div className="text-gray-500 italic">No routines added yet...</div>
                ) : (
                  <div className="space-y-3">
                    {routines.map((routine) => (
                      <div key={routine.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={routine.id}
                          checked={routine.checked}
                          onCheckedChange={() => toggleRoutineCheck(routine.id)}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor={routine.id}
                          className="text-black font-normal leading-relaxed cursor-pointer flex-1"
                        >
                          {routine.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 justify-center">
              <Button
                onClick={addCheckedToPractice}
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
                onClick={clearUncheckedRoutines}
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
                onClick={clearAllRoutines}
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
              <div className="bg-[#d9d9d9] border-2 border-[#50bcea] text-black resize-none min-h-[420px] p-3 rounded-md overflow-y-auto">
                {todaysRoutines.length === 0 ? (
                  <div className="text-gray-500 italic">No routines added yet...</div>
                ) : (
                  <div className="space-y-3">
                    {todaysRoutines.map((routine) => (
                      <div key={routine.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={routine.id}
                          checked={routine.checked}
                          onCheckedChange={() => toggleTodaysRoutineCheck(routine.id)}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor={routine.id}
                          className="text-black font-normal leading-relaxed cursor-pointer flex-1"
                        >
                          {routine.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
