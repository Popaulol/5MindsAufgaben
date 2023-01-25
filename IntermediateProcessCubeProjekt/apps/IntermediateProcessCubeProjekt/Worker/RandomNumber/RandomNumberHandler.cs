namespace IntermediateProcessCubeProjekt.Worker.RandomNumber;

using System.Threading;
using System.Threading.Tasks;

using AtlasEngine;
using AtlasEngine.ExternalTasks;

#pragma warning disable CS0618
[ExternalTaskHandler("RandomNumber")]
#pragma warning restore CS0618
public class RandomNumberHandler : IExternalTaskHandler<RandomNumberPayload, RandomNumberResult>
{
    public Task<RandomNumberResult> HandleAsync(RandomNumberPayload input, ExternalTask task,
        CancellationToken cancellationToken = new ())
    {
        Random rnd = new Random();

        var result = new RandomNumberResult(rnd.Next(1, 101));

        return Task.FromResult(result);
    }
}
