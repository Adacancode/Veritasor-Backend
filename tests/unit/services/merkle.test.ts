import { describe, it, expect } from 'vitest';
import MerkleTree from '../../../src/services/merkle';

describe('MerkleTree', () => {
  it('produces deterministic roots for identical leaves', () => {
    const leaves = ['a', 'b', 'c', 'd', 'e'];
    const t1 = new MerkleTree(leaves);
    const t2 = new MerkleTree(leaves);

    expect(t1.getRoot()).toBe(t2.getRoot());
  });

  it('verifies a valid proof for a leaf', () => {
    const leaves = ['a', 'b', 'c', 'd', 'e'];
    const tree = new MerkleTree(leaves);
    const index = 2;
    const proof = tree.getProof(index);
    const root = tree.getRoot();

    expect(MerkleTree.verifyProof(leaves[index], proof, root, index)).toBe(true);
  });

  it('rejects tampered proofs', () => {
    const leaves = ['a', 'b', 'c', 'd', 'e'];
    const tree = new MerkleTree(leaves);
    const index = 2;
    const proof = tree.getProof(index);
    const root = tree.getRoot();
    const badProof = [...proof];

    if (badProof.length > 0) {
      badProof[0] = badProof[0].replace(/^[0-9a-f]/, (char) => (char === '0' ? '1' : '0'));
    }

    expect(MerkleTree.verifyProof(leaves[index], badProof, root, index)).toBe(false);
  });
});
