import { Theme, Card, Text, Flex } from "@radix-ui/themes";
import React from "react";
import { HelpCircle } from "lucide-react"; // Using Lucide's HelpCircle icon

const Help = () => {
  return (
    <Theme>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Help & Support</h1>
        <Card className="p-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <Flex direction="column" align="center" gap="4">
            <HelpCircle size={48} className="text-gray-400" />
            <Text size="4" weight="medium" className="text-gray-700">
              Assistance Center
            </Text>
            <Text size="2" className="text-gray-500 text-center">
              Need help? This section is under development. For now, please contact support at support@example.com or check our FAQ for assistance.
            </Text>
          </Flex>
        </Card>
      </div>
    </Theme>
  );
};

export default Help;