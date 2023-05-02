const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {

  const MAX_PARTITION_KEY_LENGTH = 256
  const TRIVIAL_PARTITION_KEY = "0"

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("Returns existing partition key if it is presented on input", () => {
    const EVENT_SAMPLE = { partitionKey: "12345", payload:200 }
    const key = deterministicPartitionKey( EVENT_SAMPLE )
    expect( key ).toBe("12345")
  })

  it("Return hash from input if partitionKey prop is not presented", () => {
    const EVENT_SAMPLE = { payload:200 }
    const key = deterministicPartitionKey( EVENT_SAMPLE )
    expect( key ).toBe( 'aeabdb9e64371f8ca35bf02f4014bf61d696aa9bcba421de1c20b9100ead91270fe0935beaadb79ee1d51e49a0839ea789cec356b8e954313e8c0b574f4b2997' )
  })

  it("Return serialized partitionKey if it's type is not string", () => {
    const EVENT_SAMPLE = { payload:200, partitionKey: [100] }
    const key = deterministicPartitionKey( EVENT_SAMPLE )
    expect( key ).toBe("[100]")
  })

  it("Return a hash of the partitionKey property if it's length is more than MAX_PARTITION_KEY_LENGTH", () => {
    const partitionKey = 'a'.repeat( MAX_PARTITION_KEY_LENGTH + 1 )
    const EVENT_SAMPLE = { payload:200, partitionKey }
    const key = deterministicPartitionKey( EVENT_SAMPLE )
    expect( key ).toBe("5008048b64c14975181175f157be4a780c3d443d2177edf323d57884bc7e3979b9b53bca1325e880df3da0d97c435693441cb5527fbe950f5585678dfbb37785")
  })
});
