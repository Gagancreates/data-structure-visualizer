import { Problem } from '@/lib/types';

export const mockProblems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your code here
    pass

# Test
result = twoSum([2, 7, 11, 15], 9)
print(result)`,
    testCases: [
      { input: '[2,7,11,15], 9', expectedOutput: '[0,1]' },
      { input: '[3,2,4], 6', expectedOutput: '[1,2]' }
    ],
    dataStructures: ['array', 'hashmap']
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
        explanation: 'The linked list is reversed from 1->2->3->4->5 to 5->4->3->2->1'
      },
      {
        input: 'head = [1,2]',
        output: '[2,1]'
      },
      {
        input: 'head = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 5000]',
      '-5000 <= Node.val <= 5000'
    ],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    """
    :type head: ListNode
    :rtype: ListNode
    """
    # Write your code here
    pass

# Test
# head = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))
# result = reverseList(head)`,
    testCases: [
      { input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' },
      { input: '[1,2]', expectedOutput: '[2,1]' }
    ],
    dataStructures: ['linkedlist']
  },
  {
    id: 'binary-tree-inorder',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.

Inorder traversal visits nodes in the order: Left -> Root -> Right`,
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]',
        explanation: 'Inorder traversal: left subtree (none), root (1), right subtree (3, 2)'
      },
      {
        input: 'root = []',
        output: '[]'
      },
      {
        input: 'root = [1]',
        output: '[1]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100]',
      '-100 <= Node.val <= 100'
    ],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorderTraversal(root):
    """
    :type root: TreeNode
    :rtype: List[int]
    """
    # Write your code here
    pass

# Test
# root = TreeNode(1, None, TreeNode(2, TreeNode(3), None))
# result = inorderTraversal(root)`,
    testCases: [
      { input: '[1,null,2,3]', expectedOutput: '[1,3,2]' },
      { input: '[]', expectedOutput: '[]' }
    ],
    dataStructures: ['tree']
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: 'The string contains valid matching parentheses.'
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'All brackets are properly matched and in correct order.'
      },
      {
        input: 's = "(]"',
        output: 'false',
        explanation: 'Brackets are not properly matched.'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    starterCode: `def isValid(s):
    """
    :type s: str
    :rtype: bool
    """
    # Write your code here
    pass

# Test
result = isValid("()[]{}")
print(result)`,
    testCases: [
      { input: '"()"', expectedOutput: 'true' },
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' }
    ],
    dataStructures: ['stack']
  },
  {
    id: 'max-depth-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    description: `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3',
        explanation: 'The maximum depth is 3 (path: 3 -> 20 -> 15 or 3 -> 20 -> 7)'
      },
      {
        input: 'root = [1,null,2]',
        output: '2',
        explanation: 'The maximum depth is 2 (path: 1 -> 2)'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4]',
      '-100 <= Node.val <= 100'
    ],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxDepth(root):
    """
    :type root: TreeNode
    :rtype: int
    """
    # Write your code here
    pass

# Test
# root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
# result = maxDepth(root)`,
    testCases: [
      { input: '[3,9,20,null,null,15,7]', expectedOutput: '3' },
      { input: '[1,null,2]', expectedOutput: '2' }
    ],
    dataStructures: ['tree']
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    examples: [
      {
        input: 'nums = [1,2,3,1]',
        output: 'true',
        explanation: 'The value 1 appears at index 0 and index 3.'
      },
      {
        input: 'nums = [1,2,3,4]',
        output: 'false',
        explanation: 'All elements are distinct.'
      },
      {
        input: 'nums = [1,1,1,3,3,4,3,2,4,2]',
        output: 'true',
        explanation: 'Multiple values appear more than once.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    starterCode: `def containsDuplicate(nums):
    """
    :type nums: List[int]
    :rtype: bool
    """
    # Write your code here
    pass

# Test
result = containsDuplicate([1, 2, 3, 1])
print(result)`,
    testCases: [
      { input: '[1,2,3,1]', expectedOutput: 'true' },
      { input: '[1,2,3,4]', expectedOutput: 'false' }
    ],
    dataStructures: ['array', 'hashmap']
  }
];
