# Audit VOC

## Document

- [Notion](https://nonstop-krypton-90d.notion.site/Taisys-VOC-9222f3ab03074513bedd8357f099f854)
- [Audit Report](https://www.certik.com/projects/taisys)

## Test

### Setup

```bash
npm install
```

### Run

```bash
# run all tests
npx hardhat test

# run single test
npx hardhat test ${TEST_FILE_PATH}

# run tests with coverage report
npx hardhat coverage
```

## Static Analysis

- [Slither Github](https://github.com/crytic/slither)

```bash
slither .
```
