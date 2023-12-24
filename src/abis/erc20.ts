interface AbiInput {
    name: string;
    type: string;
  }
  
  interface AbiOutput {
    name: string;
    type: string;
  }
  
  interface AbiItem {
    constant: boolean;
    inputs: AbiInput[];
    name: string;
    outputs: AbiOutput[];
    payable: boolean;
    stateMutability: string;
    type: string;
  }
  
  const ERC_20_ABI: { [key: string]: AbiItem } = {
    transfer: {
      constant: false,
      inputs: [
        {
          name: '_to',
          type: 'address',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  };
  
  export { ERC_20_ABI };
  export {};