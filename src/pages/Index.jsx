import React, { useState } from "react";
import { Box, Heading, VStack, HStack, IconButton, Input, Button, Text, Progress, useToast } from "@chakra-ui/react";
import { FaPlus, FaCheck } from "react-icons/fa";

const Index = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const toast = useToast();

  const addHabit = () => {
    if (newHabit.trim() === "") {
      toast({
        title: "Please enter a habit name",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setHabits([...habits, { name: newHabit, completed: false }]);
    setNewHabit("");
  };

  const completeHabit = (index) => {
    const updatedHabits = habits.map((habit, i) => {
      if (i === index) {
        return { ...habit, completed: true };
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  const completedCount = habits.filter((habit) => habit.completed).length;
  const progress = habits.length > 0 ? (completedCount / habits.length) * 100 : 0;

  return (
    <Box p={8}>
      <VStack spacing={4} align="stretch">
        <Heading>Habit Tracker</Heading>
        <HStack>
          <Input placeholder="Enter a new habit" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} />
          <IconButton icon={<FaPlus />} onClick={addHabit} aria-label="Add habit" />
        </HStack>
        {habits.map((habit, index) => (
          <HStack key={index} justifyContent="space-between">
            <Text as={habit.completed ? "s" : ""}>{habit.name}</Text>
            <IconButton icon={<FaCheck />} onClick={() => completeHabit(index)} aria-label="Complete habit" colorScheme={habit.completed ? "green" : "gray"} isDisabled={habit.completed} />
          </HStack>
        ))}
        {habits.length > 0 && (
          <>
            <Progress value={progress} size="lg" colorScheme="green" />
            <Text>
              {completedCount} of {habits.length} habits completed
            </Text>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
