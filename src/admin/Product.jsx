import { Theme, Card, Text, Flex } from "@radix-ui/themes";
import React from "react";
import { Package } from "lucide-react"; // Using Lucide Icons for a product-related icon

const Product = () => {
  return (
    <Theme>
      <div className="p-6 ">
        <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>
        <Card className="p-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <Flex direction="column" align="center" gap="4">
            <Package size={48} className="text-gray-400" />
            <Text size="4" weight="medium" className="text-gray-700">
              Products Not Available
            </Text>
            <Text size="2" className="text-gray-500 text-center">
              This feature is currently under development and will be available in the future. Stay tuned for updates!
            </Text>
          </Flex>
        </Card>
      </div>
    </Theme>
  );
};

export default Product;