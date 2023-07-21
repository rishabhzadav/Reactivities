using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // new NotImplementedException();
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
                // below return  nothing but it is used to fulfil the return type of the method
                return Unit.Value;

            }
        }
    }
}