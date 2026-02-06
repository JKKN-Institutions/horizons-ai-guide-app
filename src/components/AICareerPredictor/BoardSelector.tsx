import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BoardSelectorProps {
  selectedBoard: string;
  onSelectBoard: (boardId: string) => void;
}

const boards = [
  { id: "tn_state", label: "Tamil Nadu State Board", icon: "🏛️", recommended: true, description: "TN State Board of Higher Secondary Education" },
  { id: "cbse", label: "CBSE", icon: "📘", description: "Central Board of Secondary Education" },
  { id: "icse", label: "ICSE", icon: "📗", description: "Indian Certificate of Secondary Education" },
  { id: "other", label: "Other State Boards", icon: "🎓", description: "Kerala, Karnataka, AP, etc." },
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 }
};

export const BoardSelector = ({ selectedBoard, onSelectBoard }: BoardSelectorProps) => {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-1">📚 Select Your Education Board</h2>
        <p className="text-sm text-muted-foreground">உங்கள் கல்வி வாரியத்தைத் தேர்ந்தெடுக்கவும்</p>
      </div>

      <motion.div className="grid gap-3 max-w-md mx-auto" variants={containerVariants}>
        {boards.map((board) => (
          <motion.div key={board.id} variants={itemVariants}>
            <Card
              className={`cursor-pointer transition-all duration-300 ${
                selectedBoard === board.id
                  ? "border-2 border-primary bg-primary/5 shadow-lg"
                  : "hover:border-primary/30 hover:bg-muted/50"
              }`}
              onClick={() => onSelectBoard(board.id)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <span className="text-2xl">{board.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{board.label}</span>
                    {board.recommended && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{board.description}</p>
                </div>
                {selectedBoard === board.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-md shrink-0"
                  >
                    <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BoardSelector;
